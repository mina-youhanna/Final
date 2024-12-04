import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  min-height: 100vh;
  background-image: url('https://images.pexels.com/photos/8500417/pexels-photo-8500417.jpeg');
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  padding: 20px;
  color: #333;
  width: 100%;
`;

const Title = styled.h1`
  color: #fff;
  margin-bottom: 2rem;
`;

const PlansContainer = styled.div`
  display: flex;
  gap: 2rem;
  margin-bottom: 2rem;
`;

const PlanCard = styled.div`
  background-color: ${(props) => (props.selected ? '#ff6b6b' : 'rgba(255, 255, 255, 0.8)')};
  border: 2px solid ${(props) => (props.selected ? '#ff6b6b' : '#ccc')};
  border-radius: 10px;
  padding: 2rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  
  h2 {
    color: ${(props) => (props.selected ? '#fff' : '#333')};
  }
  
  p {
    color: ${(props) => (props.selected ? '#fff' : '#666')};
    margin: 1rem 0;
  }
`;

const SelectButton = styled.button`
  background-color: transparent;
  border: 2px solid #ff6b6b;
  color: #ff6b6b;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: #ff6b6b;
    color: #fff;
  }
`;

const SubscribeButton = styled.button`
  background-color: #ff6b6b;
  color: white;
  border: none;
  padding: 1rem 2rem;
  font-size: 1.2rem;
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: #e84343;
  }
`;

const Message = styled.div`
  background-color: ${(props) => (props.success ? '#d4edda' : '#f8d7da')};
  color: ${(props) => (props.success ? '#155724' : '#721c24')};
  border: 1px solid ${(props) => (props.success ? '#c3e6cb' : '#f5c6cb')};
  padding: 1rem;
  border-radius: 10px;
  margin-top: 2rem;
  text-align: center;
`;

const CurrentSubscription = styled.div`
  background-color: rgba(255, 255, 255, 0.8);
  border: 1px solid #ccc;
  padding: 2rem;
  border-radius: 10px;
  text-align: center;
  margin-top: 2rem;
  
  h2 {
    color: #333;
    margin-bottom: 1rem;
  }
  
  p {
    color: #666;
    margin: 0.5rem 0;
  }
`;

export default function SubscriptionPage() {
  const [plans, setPlans] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [subscription, setSubscription] = useState(null);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    axios.get('/api/subscriptions/current')
      .then((response) => {
        setSubscription(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan);
  };

  const handleSubscribe = () => {
    if (!selectedPlan) {
      alert('Please select a plan.');
      return;
    }
    axios.post('/api/subscriptions/create', selectedPlan)
      .then((response) => {
        setMessage({ success: true, text: `تم الاشتراك في ${response.data.type}` });
      })
      .catch((error) => {
        console.log(error);
        setMessage({ success: false, text: 'يجب الدفع أولاً' });
      });
  };

  useEffect(() => {
    setPlans([
      {
        id: 1,
        name: 'Pay per session',
        price: '50 EGP',
        description: 'Pay only for one session.'
      },
      {
        id: 2,
        name: 'Monthly Subscription',
        price: '500 EGP',
        description: 'Access all sessions for a month.'
      },
      {
        id: 3,
        name: 'Yearly Subscription',
        price: '5000 EGP',
        description: 'Unlimited access for a year.'
      }
    ]);
  }, []);

  return (
    <Container>
      <Title>Choose Your Subscription Plan</Title>
      <PlansContainer>
        {plans.map((plan) => (
          <PlanCard
            key={plan.id}
            selected={selectedPlan?.id === plan.id}
            onClick={() => handlePlanSelect(plan)}
          >
            <h2>{plan.name}</h2>
            <p>{plan.price}</p>
            <p>{plan.description}</p>
            <SelectButton>
              {selectedPlan?.id === plan.id ? 'Selected' : 'Select'}
            </SelectButton>
          </PlanCard>
        ))}
      </PlansContainer>
      <SubscribeButton onClick={handleSubscribe}>
        Subscribe Now
      </SubscribeButton>
      {message && (
        <Message success={message.success}>
          {message.text}
        </Message>
      )}
      {subscription && (
        <CurrentSubscription>
          <h2>Your Current Subscription</h2>
          <p>Type: {subscription.type}</p>
          <p>Start Date: {new Date(subscription.startDate).toLocaleDateString()}</p>
          <p>End Date: {new Date(subscription.endDate).toLocaleDateString()}</p>
          <p>Price: {subscription.price} EGP</p>
        </CurrentSubscription>
      )}
    </Container>
  );
}
