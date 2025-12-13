/**
 * React Usage Example
 * 
 * This example demonstrates how to use the Lit Atoms React wrappers
 * in a real React application.
 */

import React, { useState } from 'react';
import { 
  LitButtonReact, 
  LitInputFieldReact, 
  LitCheckboxReact 
} from '@lit-atoms/react';

export function ReactExample() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (name && email && agreed) {
      setSubmitted(true);
      console.log('Form submitted:', { name, email, agreed });
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto', padding: '20px' }}>
      <h2>User Registration</h2>
      
      <div style={{ marginBottom: '20px' }}>
        <LitInputFieldReact
          label="Full Name"
          placeholder="Enter your name"
          value={name}
          required
          onInputChange={(e) => setName(e.detail.value)}
        />
      </div>

      <div style={{ marginBottom: '20px' }}>
        <LitInputFieldReact
          label="Email Address"
          type="email"
          placeholder="Enter your email"
          value={email}
          required
          onInputChange={(e) => setEmail(e.detail.value)}
        />
      </div>

      <div style={{ marginBottom: '20px' }}>
        <LitCheckboxReact
          label="I agree to the terms and conditions"
          checked={agreed}
          onCheckboxChange={(e) => setAgreed(e.detail.checked)}
        />
      </div>

      <LitButtonReact
        label={submitted ? 'Submitted!' : 'Submit'}
        variant="primary"
        size="medium"
        disabled={!name || !email || !agreed || submitted}
        onButtonClick={handleSubmit}
      />

      {submitted && (
        <p style={{ marginTop: '20px', color: 'green' }}>
          Thank you for registering, {name}!
        </p>
      )}
    </div>
  );
}
