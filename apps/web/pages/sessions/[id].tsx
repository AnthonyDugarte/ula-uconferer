import { FC } from "react";
import { useRouter } from "next/router";
import { gql, useQuery } from "@apollo/client";
import { withApollo } from "../../lib/withApollo";
import { Layout } from "../../components/layout";
import { SessionEntry } from ".";

interface Session {
  session_id: string;
  summarization: string;
  name: string;
  start_at?: string;
  end_at?: string;
  SessionUploads: {
    url: string;
  }[];
  User: {
    user_id: string;
    firstname: string;
    lastname: string;
    UserUploads: {
      url: string;
    }[];
  };
}

interface SessionByIdResult {
  Session: Session[];
}

const SESSION_QUERY = gql`
  query getSessionById($sessionId: Int!) {
    Session(where: { session_id: { _eq: $sessionId } }) {
      session_id
      summarization
      name
      start_at
      end_at
      SessionUploads {
        url
      }
      User {
        firstname
        lastname
        UserUploads {
          url
        }
      }
    }
  }
`;

const SessionPresentation: FC = (props) => {
  const router = useRouter();
  const { id } = router.query;

  const { loading, error, data } = useQuery<SessionByIdResult>(SESSION_QUERY, {
    variables: {
      sessionId: id,
    },
  });

  const session = data?.Session?.[0];

  if (loading) return <>Loading...</>;
  if (error) return <>Error! ${error.message}</>;

  if (!session) {
    return (
      <Layout>
        <span className="m-auto text-3xl font-bold">Session not found</span>
      </Layout>
    );
  }

  const sessionVideo = session.SessionUploads?.find(({ url }) =>
    /youtu/.test(url)
  );

  if (!sessionVideo) {
    return (
      <Layout>
        <span className="m-auto text-3xl font-bold">Video not found</span>
      </Layout>
    );
  }

  const videoId = sessionVideo.url.replace(/.*\/([a-zA-z0-9]+)$/, "$1");

  if (!videoId) {
    return (
      <Layout>
        <span className="m-auto text-3xl font-bold">Video not found</span>
      </Layout>
    );
  }

  return (
    <Layout>
      <iframe
        id="player"
        className="w-full h-full"
        src={`https://youtube.com/embed/${videoId}`}
        allowFullScreen
      ></iframe>

      <SessionEntry session={session} />
    </Layout>
  );
};

export default withApollo()(SessionPresentation);
