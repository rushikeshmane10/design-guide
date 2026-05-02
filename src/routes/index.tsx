import { createFileRoute, Navigate } from "@tanstack/react-router";
import { useAuth } from "@/hooks/use-auth";
import { GeneratorView } from "@/components/GeneratorView";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Post to X — Social AI" },
      { name: "description", content: "Generate and publish AI-powered social posts." },
    ],
  }),
  component: Index,
});

function Index() {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" />;
  return <GeneratorView />;
}
