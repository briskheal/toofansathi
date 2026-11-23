// Cloudflare Pages Function: /api/live
// Dynamically resolves the active, real-time YouTube live stream video ID for news broadcasters.
// This prevents playing archived/past recordings when broadcasts conclude or switch sessions.

const BROADCASTER_HANDLES = {
  otv_odia: '@otvodisha',
  kanak_odia: '@KanakNewsOdisha',
  kalinga_odia: '@Kalingatv24x7',
  dd_odia: '@DDOdiaOfficial',
  abp_ananda: '@abpanandatv',
  zee_24_ghanta: '@zee24ghanta',
  dd_bangla: '@DDBanglaOfficial',
  tv9_telugu: '@tv9telugulive',
  ntv_telugu: '@NtvTeluguLive',
  dd_yadagiri: '@DDYadagiriOfficial',
  tv9_gujarati: '@tv9gujarati',
  sandesh_news: '@sandeshnews',
  dd_girnar: '@DDGirnarOfficial',
  polimer_tamil: '@polimernews',
  thanthi_tamil: '@thanthitv',
  dd_podhigai: '@DDPodhigaiOfficial',
  dd_news_national: '@DDnews',
  dd_india_eng: '@DDIndia',
  aaj_tak_hindi: '@aajtak'
};

export async function onRequestGet(context) {
  const url = new URL(context.request.url);
  const channelId = url.searchParams.get('channel') || 'otv_odia';
  const handle = BROADCASTER_HANDLES[channelId] || url.searchParams.get('handle') || '@otvodisha';

  const cleanHandle = handle.startsWith('@') ? handle : `@${handle}`;
  const ytLiveUrl = `https://www.youtube.com/${cleanHandle}/live`;

  try {
    const response = await fetch(ytLiveUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9'
      }
    });

    if (!response.ok) {
      return new Response(
        JSON.stringify({
          success: false,
          channelId,
          handle: cleanHandle,
          error: `YouTube returned status ${response.status}`
        }),
        {
          status: 200, // Return 200 with fallback indicator so client can use default
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          }
        }
      );
    }

    const html = await response.text();
    // YouTube embeds the active video ID in the canonical link, script tags, or watch?v= parameter
    const match = html.match(/watch\?v=([a-zA-Z0-9_-]{11})/);

    if (match && match[1]) {
      const activeVideoId = match[1];
      return new Response(
        JSON.stringify({
          success: true,
          channelId,
          handle: cleanHandle,
          videoId: activeVideoId,
          embedUrl: `https://www.youtube.com/embed/${activeVideoId}?autoplay=1&mute=0&rel=0&live=1`,
          directLiveUrl: ytLiveUrl,
          cachedAt: new Date().toISOString()
        }),
        {
          status: 200,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            // Cache on Cloudflare Edge for 2 minutes to eliminate rate limiting
            'Cache-Control': 'public, max-age=60, s-maxage=120'
          }
        }
      );
    }

    return new Response(
      JSON.stringify({
        success: false,
        channelId,
        handle: cleanHandle,
        message: 'No live stream detected in broadcaster page, use fallback'
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({
        success: false,
        channelId,
        handle: cleanHandle,
        error: err.message
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      }
    );
  }
}
