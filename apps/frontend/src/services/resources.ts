const API = process.env.NEXT_PUBLIC_STRAPI_URL

export async function getResources() {
  const res = await fetch(`${API}/api/resources?populate=*`)
  const data = await res.json()
  return data.data
}