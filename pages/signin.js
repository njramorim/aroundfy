import { getProviders, getSession, signIn } from "next-auth/client";

export default function SignIn({ providers }) {
  return (
    <>
      {Object.values(providers).map((provider) => (
        <div key={provider.name}>
          <button onClick={() => signIn(provider.id)}>
            Sign in with {provider.name}
          </button>
        </div>
      ))}
    </>
  );
}

export async function getServerSideProps(context) {
  const { req, res } = context;
  const session = await getSession({ req });

  if (session) {
    res.writeHead(302, {
      Location: "/",
    });
    res.end();
  }

  const providers = await getProviders();
  return {
    props: { providers },
  };
}
