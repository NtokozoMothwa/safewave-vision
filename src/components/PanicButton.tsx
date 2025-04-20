import React from 'react';
import { Button } from '@/components/ui/button';
import { useSmartAlert } from '@/hooks/useSmartAlert';

const PanicButton = () => {
  const { triggerAlert } = useSmartAlert();

  const handlePanic = () => {
    triggerAlert({
      type: 'panic',
      message: 'Panic button activated!',
    });
  };

  return (
    <Button
      onClick={handlePanic}
      className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full"
    >
      Activate Panic Alert
    </Button>
  );
};

export default PanicButton;
