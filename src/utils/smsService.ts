// SMS notifications via Africa's Talking API
// Server-side implementation required for security

export interface SMSNotification {
  phoneNumber: string;
  message: string;
  type: 'vaccination' | 'feeding' | 'task' | 'weather' | 'general';
}

export interface SMSResponse {
  success: boolean;
  message: string;
  messageId?: string;
}

// Send SMS via backend server
export async function sendSMS(notification: SMSNotification): Promise<SMSResponse> {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/hyper-handler/sms/send`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`
        },
        body: JSON.stringify({
          phoneNumber: notification.phoneNumber,
          message: notification.message,
          type: notification.type
        })
      }
    );

    if (!response.ok) {
      const error = await response.json();
      return {
        success: false,
        message: error.message || 'Failed to send SMS'
      };
    }

    const data = await response.json();
    return {
      success: true,
      message: 'SMS sent successfully',
      messageId: data.messageId
    };
  } catch (error) {
    console.error('SMS error:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Network error'
    };
  }
}

// Send vaccination reminder
export async function sendVaccinationReminder(
  phoneNumber: string,
  animalName: string,
  vaccinationType: string,
  dueDate: string
): Promise<SMSResponse> {
  const message = `Evie Farm Alert: Vaccination due for ${animalName}. Type: ${vaccinationType}. Due: ${dueDate}. Please schedule appointment.`;

  return sendSMS({
    phoneNumber,
    message,
    type: 'vaccination'
  });
}

// Send feeding reminder
export async function sendFeedingAlert(
  phoneNumber: string,
  feedType: string,
  currentStock: number,
  threshold: number
): Promise<SMSResponse> {
  const message = `Evie Farm Alert: Low stock on ${feedType}. Current: ${currentStock}kg, Threshold: ${threshold}kg. Reorder soon.`;

  return sendSMS({
    phoneNumber,
    message,
    type: 'feeding'
  });
}

// Send task reminder
export async function sendTaskReminder(
  phoneNumber: string,
  taskTitle: string,
  dueDate: string
): Promise<SMSResponse> {
  const message = `Evie Farm Task: "${taskTitle}" is due ${dueDate}. Please complete on time.`;

  return sendSMS({
    phoneNumber,
    message,
    type: 'task'
  });
}

// Send weather alert
export async function sendWeatherAlert(
  phoneNumber: string,
  alertMessage: string
): Promise<SMSResponse> {
  const message = `Evie Farm Weather: ${alertMessage}`;

  return sendSMS({
    phoneNumber,
    message,
    type: 'weather'
  });
}

// Send bulk SMS to multiple recipients
export async function sendBulkSMS(
  phoneNumbers: string[],
  message: string,
  type: SMSNotification['type'] = 'general'
): Promise<SMSResponse[]> {
  const promises = phoneNumbers.map(phoneNumber =>
    sendSMS({ phoneNumber, message, type })
  );

  return Promise.all(promises);
}

// Validate phone number format (Uganda)
export function validatePhoneNumber(phone: string): boolean {
  // Uganda phone numbers: +256XXXXXXXXX or 0XXXXXXXXX
  const ugandaPattern = /^(\+256|0)[37]\d{8}$/;
  return ugandaPattern.test(phone.replace(/\s/g, ''));
}

// Format phone number to E.164 format
export function formatPhoneNumber(phone: string): string {
  // Remove spaces and special characters
  const cleaned = phone.replace(/[\s\-\(\)]/g, '');

  // Convert to E.164 format
  if (cleaned.startsWith('0')) {
    return '+256' + cleaned.substring(1);
  }

  if (cleaned.startsWith('256')) {
    return '+' + cleaned;
  }

  if (cleaned.startsWith('+256')) {
    return cleaned;
  }

  // Default: assume Uganda number
  return '+256' + cleaned;
}

// Check if SMS service is configured
export function isSMSConfigured(): boolean {
  return !!(import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY);
}
