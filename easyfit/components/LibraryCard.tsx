import { Card, H4, Button, Group, Separator } from "tamagui";
import { useRouter } from "expo-router";
import { ExternalLink } from '@tamagui/lucide-icons';

export default function LibraryCard({ title, content = "Sample content", link }) {
  const router = useRouter();

  return (
    <Card
      size={"$4"}
      bordered
      animation="bouncy"
      width={320}
      scale={1}
      hoverStyle={{ scale: 0.925 }}
      pressStyle={{ scale: 0.875 }}
      borderRadius={"$10"}
    >
      <Card.Header padded paddingBottom={"$-1"}>
        <H4>{title.toUpperCase()}</H4>
      </Card.Header>
      <Separator />
      <Card.Footer padded>
        <Group orientation="horizontal">
          <Group.Item>
            <Button
              icon={ExternalLink}
              onPress={() => router.push(link)}
              marginRight={"$2"}
            />
          </Group.Item>
        </Group>
      </Card.Footer>
    </Card>
  );
}
