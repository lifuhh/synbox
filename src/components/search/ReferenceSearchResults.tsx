/**
 * v0 by Vercel.
 * @see https://v0.dev/t/W8xB0X5YtOK
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Button } from "@/components/ui/button"

export default function Component() {
  return (
    <div>
      {/* Item 1 */}
      <div className="w-full max-h-[300px] overflow-auto">
        <div className="grid gap-1 p-2">
          {/*  */}
          <div className="flex items-center gap-2 p-2 rounded-md bg-gray-100 dark:bg-gray-800">
            <img
              alt="Avatar"
              className="rounded-full"
              height={40}
              src="/placeholder.svg"
              style={{
                aspectRatio: "40/40",
                objectFit: "cover",
              }}
              width={40}
            />
            {/*  */}
            <div className="grid gap-0.5 text-xs shrink-0">
              <p className="font-medium">Grace Murphy</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">grace.murphy@example.com</p>
            </div>
            {/*  */}
            <Button className="ml-auto" size="sm" variant="outline">
              Add
            </Button>
          </div>
          {/*  */}
          <div className="flex items-center gap-2 p-2 rounded-md bg-gray-100 dark:bg-gray-800">
            <img
              alt="Avatar"
              className="rounded-full"
              height={40}
              src="/placeholder.svg"
              style={{
                aspectRatio: "40/40",
                objectFit: "cover",
              }}
              width={40}
            />
            <div className="grid gap-0.5 text-xs shrink-0">
              <p className="font-medium">Ella Scott</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">ella.scott@example.com</p>
            </div>
            <Button className="ml-auto" size="sm" variant="outline">
              Add
            </Button>
          </div>
          <div className="flex items-center gap-2 p-2 rounded-md bg-gray-100 dark:bg-gray-800">
            <img
              alt="Avatar"
              className="rounded-full"
              height={40}
              src="/placeholder.svg"
              style={{
                aspectRatio: "40/40",
                objectFit: "cover",
              }}
              width={40}
            />
            <div className="grid gap-0.5 text-xs shrink-0">
              <p className="font-medium">Aria Johnson</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">aria.johnson@example.com</p>
            </div>
            <Button className="ml-auto" size="sm" variant="outline">
              Add
            </Button>
          </div>
          <div className="flex items-center gap-2 p-2 rounded-md bg-gray-100 dark:bg-gray-800">
            <img
              alt="Avatar"
              className="rounded-full"
              height={40}
              src="/placeholder.svg"
              style={{
                aspectRatio: "40/40",
                objectFit: "cover",
              }}
              width={40}
            />
            <div className="grid gap-0.5 text-xs shrink-0">
              <p className="font-medium">Liam Williams</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">liam.williams@example.com</p>
            </div>
            <Button className="ml-auto" size="sm" variant="outline">
              Add
            </Button>
          </div>
          <div className="flex items-center gap-2 p-2 rounded-md bg-gray-100 dark:bg-gray-800">
            <img
              alt="Avatar"
              className="rounded-full"
              height={40}
              src="/placeholder.svg"
              style={{
                aspectRatio: "40/40",
                objectFit: "cover",
              }}
              width={40}
            />
            <div className="grid gap-0.5 text-xs shrink-0">
              <p className="font-medium">Harper Brown</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">harper.brown@example.com</p>
            </div>
            <Button className="ml-auto" size="sm" variant="outline">
              Add
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

