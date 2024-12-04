import mongoose from 'mongoose';

const subscriptionSchema = new mongoose.Schema({
  studentId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Student', 
    required: true 
  },
  type: { 
    type: String, 
    enum: ['Per-Class', 'Monthly', 'Yearly'], 
    required: true 
  },
  startDate: { 
    type: Date, 
    required: true 
  },
  endDate: { 
    type: Date, 
    required: true 
  },
  price: { 
    type: Number, 
    required: true 
  },
});

const Subscription = mongoose.model('Subscription', subscriptionSchema);
export default Subscription;
