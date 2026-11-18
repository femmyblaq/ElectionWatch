
import AgentApplicationReview from "./agent-application-review";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function Page({ params }: PageProps) {
  const { id } = await params;

  return <AgentApplicationReview id={id} />;
}
