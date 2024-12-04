import { NextRequest, NextResponse } from "next/server";
import emitter from "@/app/lib/emitter";

export async function GET(request: NextRequest) {
  const response = new NextResponse(
    new ReadableStream({
      start(controller) {
        try {
          const encoder = new TextEncoder();

          const sendEvent = (data: string) => {
            controller.enqueue(encoder.encode(`data: ${data}\n\n`));
          };

          const listener = (data: string) => {
            sendEvent(data);
          };

          emitter.on("update", listener);

          const heartbeat = setInterval(() => {
            controller.enqueue(encoder.encode(`: keep-alive\n\n`));
          }, 15000);

          request.signal.addEventListener("abort", () => {
            clearInterval(heartbeat);
            emitter.off("update", listener);
            controller.close();
          });
        } catch (error) {
          controller.error(error);
        }
      },
    }),
    {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    }
  );

  return response;
}
