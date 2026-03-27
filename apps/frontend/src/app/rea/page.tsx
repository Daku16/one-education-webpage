import { getResources } from "@/src/services/resources"
import { ResourceGrid } from "@/src/components/resources/ResourceGrid"  // ← Importa!

export default async function ReaPage() {
  const resources = await getResources();

  return (
    <div className="min-h-screen flex flex-col items-center p-24 space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Recursos Educativos</h1>
        <p>Aquí encontrarás recursos para tu aprendizaje.</p>
      </div>
      <ResourceGrid resources={resources} />
    </div>
  )
}

