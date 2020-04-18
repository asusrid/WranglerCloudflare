const someJSONURL = 'https://cfw-takehome.developers.workers.dev/api/variants'
const someJSONToSend = {
  results: ['default data to send'],
  errors: null,
  msg: 'I sent this to the fetch',
}
const someDefaultJSONToRespond = {
  results: ['default result'],
  errors: null,
  msg: 'success in sending a POST',
}
var visited = false;



addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})
/**
 * Respond with hello worker text
 * @param {Request} request
*/

async function gatherResponse(response) {
  const { headers } = response
  const contentType = headers.get('content-type')

  if (contentType.includes('application/json')) {
    const body = await response.json()
    return body
  } 
}


async function fetchPostJson(url, body = {}) {
  const init = {
    body: JSON.stringify(body),
    method: 'POST',
    headers: {
      'content-type': 'application/json;charset=UTF-8',
    },
  }

  const response = await fetch(url, init)
  const results = await gatherResponse(response)
  const retBody = Object.assign(someDefaultJSONToRespond, { results: results.variants })
  return retBody;

}

function getCookieObject(headers) {

  cookie = {}
  const cookieHeader = headers.get('Cookie')

  if(cookieHeader) {
    for(const cookieString of cookieHeader.split('; ')) {
      cookie = cookieString.split('=')
    }
    return cookie
  } else {
    return {}
  }
}



class TitleRewriter
{
  element(element)
  {
    element.replace(myTitle, {html: true});
  }
}

class HeaderRewriter
{
  element(element)
  {
    element.replace(header, {html: true});
  }
}

class ParagRewriter
{
  element(element)
  {
    element.replace(parag, {html: true});
  }
}

class ButtonRewriter
{
  element(element)
  {
    element.replace(button, {html: true});
  }
}


const rewriter = new HTMLRewriter().on('title', new TitleRewriter()).on('h1#title', new HeaderRewriter()).on('p#description', new ParagRewriter()).on('a#url', new ButtonRewriter())
 
 
async function handleRequest(request) {

	const{url, method} = request

	if (url.endsWith('/')) {

		init = {
			headers: {
				'content-type': 'text/html;charset=UTF-8',
			},
		}

    /*cookies = getCookieObject(request.headers)

    if(cookies.hasOwnProperty('visited')){
      visited = cookies.visited;
      console.log(visited)
    }else{
      visited = false;
    }*/

		respBody = await fetchPostJson(someJSONURL, someJSONToSend)

    if(!visited){
      resReturned = await fetch(respBody.results[1], init)
      header = '<h1 class="text-lg leading-6 font-medium text-gray-900" id="title">Alejandro Susillo Linkedin</h1>';
      parag = '<p class="text-sm leading-5 text-gray-500" id="description">This is Alejandro Susillo Linkedin profile!</p>';
      button = '<a class="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-blue-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-green-500 focus:outline-none focus:border-green-700 focus:shadow-outline-indigo transition ease-in-out duration-150 sm:text-sm sm:leading-5" href="https://www.linkedin.com/in/asusrid/" id="url">Visit Linkedin</a>';
      myTitle = '<title>Linkedin</title>'
      visited = true;
    }else{
      resReturned = await fetch(respBody.results[0], init)
      header = '<h1 class="text-lg leading-6 font-medium text-gray-900" id="title">Alejandro Susillo Github</h1>';
      parag = '<p class="text-sm leading-5 text-gray-500" id="description">This is Alejandro Susillo Github profile!</p>';
      button = '<a class="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-orange-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-green-500 focus:outline-none focus:border-green-700 focus:shadow-outline-indigo transition ease-in-out duration-150 sm:text-sm sm:leading-5" href="http://github.com/asusrid" id="url">Visit Github</a>';
      myTitle = '<title>Github</title>'
      visited = false;
    }

    return rewriter.transform(resReturned)

	} else {
		return new Response('An error has occurred!', {
			headers: { 'content-type': 'text/plain' },
		})
	}
}
