export default function Page() {
  return (
    <div className="w-full h-[90vh]  relative flex items-center justify-center">
      <div className="size-32 absolute mix-blend-multiply bg-transparent border-8 border-r-transparent border-b-transparent border-l-transparent  rounded-full border-t-red-500   ">
      </div>
      <div className="size-32 mix-blend-multiply absolute  bg-transparent border-8 border-t-transparent border-l-transparent border-b-transparent  rounded-full border-r-blue-500   ">
      </div>
      <div className="size-32 mix-blend-multiply absolute  bg-transparent border-8 border-t-transparent border-l-transparent border-r-transparent  rounded-full border-b-green-500   ">
      </div>
      {/* animate-[spin_2s_linear_infinite] */}
    </div>
  )
}
