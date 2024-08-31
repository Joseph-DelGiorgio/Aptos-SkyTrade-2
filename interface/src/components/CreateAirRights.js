import React, { useState } from 'react';
import { useWallet } from '@aptos-labs/wallet-adapter-react';

const CreateAirRights = () => {
  const [cubicFeet, setCubicFeet] = useState('');
  const [pricePerCubicFoot, setPricePerCubicFoot] = useState('');
  const { account, signAndSubmitTransaction } = useWallet();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!account) return; // Make sure wallet is connected

    try {
      const transaction = {
        type: "entry_function_payload",
        function: `${account.address}::air_rights::create_air_rights`,
        arguments: [cubicFeet, pricePerCubicFoot],
        type_arguments: [],
      };

      await signAndSubmitTransaction(transaction);
      alert('Air Rights created successfully!');
      setCubicFeet('');
      setPricePerCubicFoot('');
    } catch (error) {
      console.error('Error creating Air Rights:', error);
      alert('Failed to create Air Rights. See console for details.');
    }
  };

  return (
    <div>
      <h2>Create Air Rights Parcel</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          value={cubicFeet}
          onChange={(e) => setCubicFeet(e.target.value)}
          placeholder="Cubic Feet"
          required
        />
        <input
          type="number"
          value={pricePerCubicFoot}
          onChange={(e) => setPricePerCubicFoot(e.target.value)}
          placeholder="Price per Cubic Foot"
          required
        />
        <button type="submit">Create Parcel</button>
      </form>
    </div>
  );
};

export default CreateAirRights;