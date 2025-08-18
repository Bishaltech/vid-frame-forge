import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { title, prompt, aspectRatio, numberResults = 3 } = await req.json()

    const apiKey = Deno.env.get('STABILITY_AI_API_KEY')
    if (!apiKey) {
      throw new Error('Stability AI API key not found')
    }

    // Convert aspect ratio to dimensions
    const dimensions = getDimensions(aspectRatio)
    
    const response = await fetch('https://api.stability.ai/v1/generation/stable-diffusion-xl-1024-v1-0/text-to-image', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        text_prompts: [
          {
            text: `Professional YouTube thumbnail: ${title}. ${prompt}. High quality, vibrant colors, eye-catching design, bold text overlay, dramatic lighting, professional composition`,
            weight: 1
          }
        ],
        cfg_scale: 7,
        height: dimensions.height,
        width: dimensions.width,
        samples: numberResults,
        steps: 30,
      }),
    })

    if (!response.ok) {
      const errorData = await response.text()
      console.error('Stability AI API error:', errorData)
      throw new Error(`Stability AI API error: ${response.status}`)
    }

    const result = await response.json()
    
    // Convert base64 images to blob URLs and upload to Supabase storage
    const images = await Promise.all(
      result.artifacts.map(async (artifact: any, index: number) => {
        const imageData = Uint8Array.from(atob(artifact.base64), c => c.charCodeAt(0))
        const fileName = `thumbnail-${Date.now()}-${index}.png`
        
        // For now, return data URL - in production you'd upload to Supabase storage
        const dataUrl = `data:image/png;base64,${artifact.base64}`
        
        return {
          url: dataUrl,
          title,
          prompt,
          ratio: aspectRatio,
          timestamp: Date.now() + index
        }
      })
    )

    return new Response(
      JSON.stringify({ images }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    )
  } catch (error) {
    console.error('Error generating thumbnails:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    )
  }
})

function getDimensions(aspectRatio: string) {
  // Using Stability AI SDXL valid dimensions only
  const ratioMap: Record<string, { width: number; height: number }> = {
    '16:9': { width: 1344, height: 768 }, // Valid SDXL dimension closest to 16:9
    '9:16': { width: 768, height: 1344 }, // Valid SDXL dimension closest to 9:16
    '1:1': { width: 1024, height: 1024 }, // Perfect square
    '4:3': { width: 1152, height: 896 },  // Valid SDXL dimension closest to 4:3
    '21:9': { width: 1536, height: 640 }, // Valid SDXL dimension closest to 21:9
    '3:4': { width: 896, height: 1152 },  // Valid SDXL dimension closest to 3:4
    '2:1': { width: 1216, height: 832 },  // Valid SDXL dimension closest to 2:1
  }
  
  return ratioMap[aspectRatio] || ratioMap['16:9']
}