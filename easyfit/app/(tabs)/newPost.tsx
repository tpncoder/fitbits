import InputField from "@/components/InputField";
import CollapsibleSelect from "@/components/Select";
import CSlider from "@/components/Slider";
import { db } from "@/firebaseConfig";
import { getPlans } from "@/scripts/getFitnessPlans";
import { router } from "expo-router";
import { addDoc } from "firebase/firestore";
import { collection } from "firebase/firestore";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, Card, H1, Label, ScrollView, SizableText, XStack, YStack } from "tamagui";
import { ImageBackground } from "react-native";

export default function NewPost() {
    const [plans, setPlans] = useState<any[]>([]);
    const [ids, setIds] = useState<string[]>([]);
    const [sliderValue, setSliderValue] = useState<number>(50);
    const [selected, setSelected] = useState<string>("");
    const [selectedID, setSelectedID] = useState<string>("");
    const [tag, setTag] = useState("");
    const [tags, setTags] = useState<string[]>([]);

    useEffect(() => {
        const listPlans = async () => {
            const plansFromDb = await getPlans();
            if (plansFromDb) {
                const newPlans = plansFromDb.map(plan => plan.data());
                const newTitles = plansFromDb.map(title => title.id);
                setIds(newTitles);
                setPlans(newPlans);
            }
        };
        listPlans();
    }, []);

    const uniquePlans = plans.filter((plan, index, self) => 
        index === self.findIndex(p => p.title === plan.title)
    );

    const options = uniquePlans.map((plan, index) => ({
        label: plan.title || `Option ${index + 1}`,
        value: plan.title,
    }));

    const handleSelectChange = (value: string) => {
        setSelected(value);
        const selectedPlanIndex = plans.findIndex(plan => plan.title === value);
        setSelectedID(ids[selectedPlanIndex]);
    };

    const handleSliderChange = (value: number[]) => {
        setSliderValue(value[0]);
    };

    const shareProgress = async () => {
        const selectedPlanIndex = plans.findIndex(plan => plan.title === selected);
        const selected_plan = plans[selectedPlanIndex];
        try {
            const doc = await addDoc(collection(db, "posts"), {
                doc_id: selectedID,
                title: selected,
                u_name: selected_plan?.u_name || "Unknown",
                content: `${sliderValue}% progress made in the completion of this fitness plan`,
                goals: tags
            });
            router.navigate("/");
            console.log("Document written with ID: ", doc.id);
        } catch (error) {
            console.error("Error adding document: ", error);
        }
    }

    return (
        <ImageBackground 
            source={require("@/assets/images/gradient.png")}
            style={{ flex: 1, width: '100%', height: '100%' }}
            resizeMode="cover"
        >
            <SafeAreaView style={{ flex: 1 }}>
                <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 100 }}>
                    <H1 alignSelf="center" padding={"$3"} fontWeight={800} marginTop={"$12"} color={"white"}>SHARE</H1>
                    
                    <Card
                        elevate
                        size={"$4"}
                        bordered
                        animation="bouncy"
                        width={350} // Adjust width for better visibility
                        scale={1}
                        hoverStyle={{ scale: 0.925 }}
                        pressStyle={{ scale: 0.875 }}
                        margin={"$2"}
                        alignSelf="center"
                        borderRadius={"$10"}
                    >
                        <YStack gap="$2" padding="$4">
                            <CollapsibleSelect
                                id="select-1"
                                options={options}
                                onChange={handleSelectChange}
                                placeholder="Select an option"
                                label="Which Plan to share?"
                                native={false}
                            />
                        </YStack>
                    </Card>
                    
                    <Card
                        elevate
                        size={"$4"}
                        bordered
                        animation="bouncy"
                        width={350}
                        scale={1}
                        hoverStyle={{ scale: 0.925 }}
                        pressStyle={{ scale: 0.875 }}
                        margin={"$2"}
                        alignSelf="center"
                        borderRadius={"$10"}
                    >
                        <YStack gap="$2" alignItems="center" flex={1} padding={"$4"}>
                            <Label htmlFor="progress-slider">How much Progress made?</Label>
                            <CSlider width={200} onValueChange={handleSliderChange}/>
                        </YStack>
                    </Card>
                    
                    {/* Enter Goals */}
                    <Card
                        elevate
                        size={"$4"}
                        bordered
                        animation="bouncy"
                        width={350}
                        scale={1}
                        hoverStyle={{ scale: 0.925 }}
                        pressStyle={{ scale: 0.875 }}
                        margin={"$2"}
                        alignSelf="center"
                        borderRadius={"$10"}
                    >
                        <YStack gap="$1.5" alignItems="center" flex={1} padding={"$4"}>
                            <Label htmlFor="tag-field">Enter your goals: </Label>
                            <XStack>
                                <InputField
                                    store={tag}
                                    update={setTag}
                                    placeholder=""
                                    id="tag-field"
                                />
                                <Button backgroundColor={"#312F30"} marginLeft={"$2"} color={"white"} onPress={() => {
                                    setTags([...tags, tag]);
                                    setTag("");
                                }}>Add Goal</Button>
                            </XStack>
                            <XStack marginTop={"$2"}>
                            {tags.map((tag, index) => (
                                <Card 
                                    key={index} 
                                    elevate 
                                    bordered 
                                    marginRight={"$2"} 
                                    borderRadius={"$9"} 
                                    height={35}
                                    paddingRight={"$2"}
                                    paddingLeft={"$2"}
                                >
                                    <YStack 
                                        flex={1} 
                                        height="100%" 
                                        justifyContent="center" 
                                        paddingHorizontal="$2"
                                    >
                                        <XStack justifyContent="space-between" alignItems="center" flex={1}>
                                            <SizableText>{tag}</SizableText>
                                            <Button 
                                                backgroundColor="transparent" 
                                                color="black" 
                                                onPress={() => {
                                                    setTags(tags.filter((_, i) => i !== index)); 
                                                }}
                                                style={{ padding: 0 }}
                                            >
                                                <SizableText marginLeft="$2" color={"$red10Light"}>×</SizableText>
                                            </Button>
                                        </XStack>
                                    </YStack>
                                </Card>
                            ))}
                            </XStack>
                        </YStack>
                    </Card>
                    
                    {/* Share Progress Button */}
                    <Button borderRadius={"$9"} backgroundColor={"#303030"} color={"white"} width={150} alignSelf="center" onPress={shareProgress}>Share Post</Button>
                </ScrollView>
            </SafeAreaView>
        </ImageBackground>
    );
}