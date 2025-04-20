// src/utils/alertRules.ts
export interface AlertData {
  type: 'panic' | 'fall' | 'heartbeat' | 'safety_zone';
  userStatus: 'normal' | 'unresponsive' | 'distress';
  locationRisk: 'low' | 'medium' | 'high';
  timeOfDay: 'day' | 'night';
}

export function evaluateAlert(data: AlertData): 'notify_dashboard' | 'notify_responder' | 'escalate_authorities' {
  if (data.type === 'panic' && data.userStatus !== 'normal') return 'escalate_authorities';
  if (data.type === 'fall' && data.userStatus === 'unresponsive') return 'notify_responder';
  if (data.locationRisk === 'high' && data.timeOfDay === 'night') return 'notify_responder';
  return 'notify_dashboard';
}
