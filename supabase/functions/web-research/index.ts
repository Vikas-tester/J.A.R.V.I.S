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
    const { query, searchType = 'general' } = await req.json()

    if (!query) {
      throw new Error('Query is required')
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

    // Simulate web research with AI-generated content
    // In a real implementation, you'd integrate with search APIs
    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: `You are a research assistant. Provide comprehensive information about the user's query. Structure your response with key findings, relevant details, and cite hypothetical sources. Search type: ${searchType}.`
        },
        {
          role: 'user',
          content: `Research this topic: ${query}`
        }
      ],
      temperature: 0.4,
      max_tokens: 1500,
    })

    const summary = completion.choices[0]?.message?.content || 'Research could not be completed.'

    // Mock results structure
    const results = {
      query,
      searchType,
      totalResults: Math.floor(Math.random() * 1000) + 100,
      results: [
        {
          title: `Comprehensive Guide to ${query}`,
          url: `https://example.com/guide-${query.toLowerCase().replace(/\s+/g, '-')}`,
          snippet: summary.substring(0, 200) + '...'
        }
      ]
    }

    const sources = [
      `https://example.com/source1-${Date.now()}`,
      `https://example.com/source2-${Date.now()}`
    ]

    // Store in database
    await supabase.from('web_research_requests').insert({
      user_id: user.id,
      query,
      search_type: searchType,
      summary,
      results,
      sources,
      status: 'completed'
    })

    return new Response(
      JSON.stringify({ 
        summary,
        results,
        sources
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      },
    )
  } catch (error) {
    console.error('Web research error:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      },
    )
  }
})