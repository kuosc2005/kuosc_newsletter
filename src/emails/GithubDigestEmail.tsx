import {
  Html,
  Body,
  Container,
  Section,
  Text,
  Heading,
  Link,
  Hr,
  Preview,
} from "@react-email/components";
import { Summary } from "../types/github";

type Props = {
  summary: Summary[];
};

export function GitHubDigestEmail({ summary }: Props) {
  return (
    <Html>
      <Body style={body}>
        <Container style={container}>
          <Heading>GitHub Weekly Digest</Heading>

          <Text>
            {summary.length} repositories have updates.
            <br />
          </Text>
          <Hr />
          {summary.map((item) => (
            <Section key={item.repo?.id} style={{ marginBottom: "24px" }}>
              <Heading as="h3">{item.repo?.name}</Heading>

              {item.repo?.description && (
                <Text style={{ color: "#4b5563" }}>
                  {item.repo?.description}
                </Text>
              )}

              <Link href={item.repo?.url}>View repository</Link>

              {/* Issues */}
              {item.issues && item.issues?.length > 0 && (
                <>
                  <Text style={sectionTitle}>Issues</Text>
                  {item.issues.map((issue, i) => (
                    <Text key={i}>
                      • <Link href={issue.url}>{issue.title}</Link>
                      <br />
                      <span style={meta}>
                        by {issue.author.login} ·{" "}
                        {issue.comments?.totalCount ?? 0} comments
                      </span>
                    </Text>
                  ))}
                </>
              )}

              {/* Commits */}
              {item.commits && item.commits?.length > 0 && (
                <>
                  <Text style={sectionTitle}>Commits</Text>
                  {item.commits?.map((commit, i) => (
                    <Text key={i}>• {commit.message}</Text>
                  ))}
                </>
              )}

              <Hr />
            </Section>
          ))}

          <Text style={footer}>Generated at {new Date().toLocaleString()}</Text>
        </Container>
      </Body>
    </Html>
  );
}

/* styles */

const body = {
  backgroundColor: "#f3f4f6",
  fontFamily: "system-ui, sans-serif",
};

const container = {
  backgroundColor: "#ffffff",
  padding: "24px",
};

const sectionTitle = {
  fontWeight: "bold",
  marginTop: "12px",
};

const meta = {
  fontSize: "12px",
  color: "#6b7280",
};

const footer = {
  fontSize: "12px",
  color: "#9ca3af",
  marginTop: "24px",
};
