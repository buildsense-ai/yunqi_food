import { NextResponse } from "next/server"
import { getHeadersWithAuth } from "@/utils/server-utils"

export async function DELETE(request: Request, { params }: { params: { eventId: string; messageId: string } }) {
  try {
    const { eventId, messageId } = params

    const headers = getHeadersWithAuth(request)

    const response = await fetch(`http://43.139.19.144:8000/events-db/${eventId}/images/${messageId}`, {
      method: "DELETE",
      headers,
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(`API responded with status: ${response.status}. ${errorData.message || "Unknown error"}`)
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error(`Error deleting image from event ${params.eventId}:`, error)
    return NextResponse.json(
      { error: "Failed to delete image", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 },
    )
  }
}
