import React, { useState, useMemo } from 'react';
import { Check, ChevronDown, ChevronUp } from '@tamagui/lucide-icons';
import { Adapt, Label, Select, Sheet, XStack, YStack } from 'tamagui';
import { LinearGradient } from 'tamagui/linear-gradient'

const CollapsibleSelect = ({ options, onChange, placeholder, label, id, native }) => {
  const [selectedValue, setSelectedValue] = useState('');
  
  const handleSelect = (value) => {
    setSelectedValue(value);
    if (onChange) {
      onChange(value);
    }
  };

  return (
    <YStack gap="$4">
      <YStack ai="center">
        {label && (
          <Label htmlFor={id} f={1} miw={80}>
            {label}
          </Label>
        )}

        <Select value={selectedValue} onValueChange={handleSelect} disablePreventBodyScroll native={native}>
          <Select.Trigger width={220} iconAfter={ChevronDown}>
            <Select.Value placeholder={placeholder} />
          </Select.Trigger>

          {/* Collapsible for smaller screens */}
          <Adapt when="sm" platform="touch">
            <Sheet
              native={!!native}
              modal
              dismissOnSnapToBottom
              animationConfig={{
                type: 'spring',
                damping: 20,
                mass: 1.2,
                stiffness: 250,
              }}
            >
              <Sheet.Frame>
                <Sheet.ScrollView>
                  <Adapt.Contents />
                </Sheet.ScrollView>
              </Sheet.Frame>
              <Sheet.Overlay animation="lazy" enterStyle={{ opacity: 0 }} exitStyle={{ opacity: 0 }} />
            </Sheet>
          </Adapt>

          <Select.Content zIndex={200000}>
            <Select.ScrollUpButton alignItems="center" justifyContent="center" width="100%" height="$3">
              <YStack zIndex={10}>
                <ChevronUp size={20} />
              </YStack>
              <LinearGradient start={[0, 0]} end={[0, 1]} fullscreen colors={['$background', 'transparent']} borderRadius="$4" />
            </Select.ScrollUpButton>

            <Select.Viewport minWidth={200}>
              <Select.Group>
                <Select.Label>Options</Select.Label>
                {useMemo(
                  () =>
                    options.map((option, i) => (
                      <Select.Item index={i} key={option.value} value={option.value}>
                        <Select.ItemText>{option.label}</Select.ItemText>
                        <Select.ItemIndicator marginLeft="auto">
                          <Check size={16} />
                        </Select.ItemIndicator>
                      </Select.Item>
                    )),
                  [options]
                )}
              </Select.Group>
            </Select.Viewport>

            <Select.ScrollDownButton alignItems="center" justifyContent="center" width="100%" height="$3">
              <YStack zIndex={10}>
                <ChevronDown size={20} />
              </YStack>
              <LinearGradient start={[0, 0]} end={[0, 1]} fullscreen colors={['transparent', '$background']} borderRadius="$4" />
            </Select.ScrollDownButton>
          </Select.Content>
        </Select>
      </YStack>
    </YStack>
  );
};

export default CollapsibleSelect;
