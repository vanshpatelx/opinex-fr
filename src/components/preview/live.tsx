
// function WebsitePreviewAndLive() {
//   return (
//     <div className="flex gap-4 w-full h-screen p-4">
//       {/* Safari preview for Website 1 */}
//       <div className="w-1/2 border rounded-lg overflow-hidden shadow-lg">
//         <iframe
//           src="https://magicui.design"
//           className="w-full h-full border-none"
//         />
//       </div>

//       {/* Live website for Website 2 */}
//       <div className="w-1/2 border rounded-lg overflow-hidden shadow-lg">
//         <iframe
//           src="https://openai.com"
//           className="w-full h-full border-none"
//         />
//       </div>
//     </div>
//   );
// }

// export default WebsitePreviewAndLive;


"use client";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

export default function ResizableWebsiteDemo() {
  return (
    <div className="w-full h-screen flex">
      <ResizablePanelGroup direction="horizontal" className="w-full h-full">
        {/* Safari Preview Panel */}
        <ResizablePanel defaultSize={50} className="border rounded-lg overflow-hidden shadow-lg">
          <iframe
            src="https://magicui.design"
            className="w-full h-full border-none"
          />
        </ResizablePanel>

        <ResizableHandle className="w-2 bg-gray-400 hover:bg-gray-500 cursor-col-resize" />

        {/* Live Website Panel */}
        <ResizablePanel defaultSize={50} className="border rounded-lg overflow-hidden shadow-lg">
          <iframe
            src="https://openai.com"
            className="w-full h-full border-none"
          />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
