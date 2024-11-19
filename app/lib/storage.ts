interface ReferralData {
  referrals: { [userId: string]: string[] };
  referredBy: { [userId: string]: string };
}

const storage: ReferralData = {
  referrals: {},
  referredBy: {},
};

export function saveReferral(userId: string, referralId: string) {
  if (!storage.referrals[referralId]) {
    storage.referrals[referralId] = [];
  }

  storage.referrals[referralId].push(userId);
  storage.referredBy[userId] = referralId;
}

export function getReferrals(userId: string): string[] {
  return storage.referrals[userId] || [];
}

export function getReferredBy(userId: string): string | null {
  return storage.referredBy[userId] || null;
}
