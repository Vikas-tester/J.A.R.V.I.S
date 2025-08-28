import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import OpenAI from 'https://esm.sh/openai@4.20.1'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.56.0'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { prompt, language = 'javascript', framework } = await req.json()

    if (!prompt) {
      throw new Error('Prompt is required')
    }

    // Get user ID from request
    const authHeader = req.headers.get('Authorization')
    if (!authHeader) {
      throw new Error('Authorization header required')
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: {
          headers: { Authorization: authHeader },
        },
      }
    )

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      throw new Error('User not authenticated')
    }

    // Initialize OpenAI
    const openai = new OpenAI({
      apiKey: Deno.env.get('OPENAI_API_KEY'),
    })

    // Generate code
    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: `You are an expert software developer. Generate clean, well-commented code in ${language}${framework ? ` using ${framework}` : ''}. Provide explanations for complex parts.`
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.3,
      max_tokens: 2000,
    })

    const response = completion.choices[0]?.message?.content || 'Failed to generate code.'

    // Extract code and explanation
    const codeMatch = response.match(/```[\w]*\n([\s\S]*?)\n```/)
    const generatedCode = codeMatch ? codeMatch[1] : response
    const explanation = response.replace(/```[\w]*\n[\s\S]*?\n```/g, '').trim()

    // Store in database
    await supabase.from('code_generations').insert({
      user_id: user.id,
      prompt,
      language,
      framework,
      generated_code: generatedCode,
      explanation,
      status: 'completed'
    })

    return new Response(
      JSON.stringify({ 
        code: generatedCode,
        explanation,
        language,
        framework
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      },
    )
  } catch (error) {
    console.error('Code generation error:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      },
    )
  }
})