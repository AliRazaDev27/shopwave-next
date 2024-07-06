import { auth } from '@/auth'
export default async function Admin() {
  const session = await auth()
  const data = JSON.stringify(session)
  return (
    <div>Page is at /admin
      <div>
        {data}
      </div>
    </div >
  );
}
