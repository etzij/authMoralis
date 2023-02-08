import { getSession, signOut } from "next-auth/react";

// gets a prop from getServerSideProps
function User( user: any ) {
  return (
    <div className="flex h-screen ">
        <div className="m-auto">
      <h4>User session:</h4>
      <pre>{JSON.stringify(user, null, 2)}</pre>
      <div>{user.id}</div>
      <button className = "bg-transparent text-5xl hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-8 px-16  border-blue-500 border-8 rounded-full shadow-xl hover:border-transparent" onClick={() => signOut({ redirect: "/signin" })}>Sign out</button>
      </div>
    </div>
  );
}

export async function getServerSideProps(context: any) {
  const session = await getSession(context);

  // redirect if not authenticated
  if (!session) {
    return {
      redirect: {
        destination: "/signin",
        permanent: false,
      },
    };
  }

  return {
    props: { user: session.user },
  };
}

export default User;