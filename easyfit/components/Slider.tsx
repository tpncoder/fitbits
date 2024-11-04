import type { SliderProps } from 'tamagui';
import { Slider } from 'tamagui';

export default function CSlider({ children, onValueChange, ...props }: SliderProps & { onValueChange: (value: number[]) => void }) {
  return (
    <Slider
      defaultValue={[50]}
      max={100}
      step={1}
      {...props}
      onValueChange={onValueChange}
    >
      <Slider.Track backgroundColor={"$red9Dark"}>
        <Slider.TrackActive backgroundColor={"$red9Light"}/>
      </Slider.Track>
      <Slider.Thumb size="$2" index={0} circular backgroundColor={"#312F30"}/>
      {children}
    </Slider>
  );
}
