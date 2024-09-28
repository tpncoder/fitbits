import { Card, H4, Button, Group, Separator } from "tamagui";
import { useRouter } from "expo-router";
import { ExternalLink, Trash2 } from '@tamagui/lucide-icons';
import { deleteDoc, doc as FirebaseDoc } from "firebase/firestore";
import { db } from "@/firebaseConfig";

export default function FitnessCard({ title, content = "Lorem ipsum", link, dbName = "fitness_plans", id, onDeleted, hideDeleted = false }) {
  const router = useRouter();

  const handleDelete = async () => {
    try {
      await deleteDoc(FirebaseDoc(db, dbName, id));
      console.log("Document deleted successfully");
      onDeleted(); // This will now call the deletion handler from index.tsx
      router.push("/"); // Optionally redirect the user after deletion
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  };

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
            <Button icon={ExternalLink} onPress={() => router.push(link)} marginRight={"$2"} />
          </Group.Item>
          {
            hideDeleted === false ?
              <Group.Item>
                <Button icon={Trash2} onPress={handleDelete} backgroundColor={"$red10Light"} color={"white"}/>
              </Group.Item> :
              <Separator />
          }
        </Group>
      </Card.Footer>
    </Card>
  );
}
