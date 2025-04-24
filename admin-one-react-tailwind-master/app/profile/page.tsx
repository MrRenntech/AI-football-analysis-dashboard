'use client';

import React from 'react';

export default function ProfilePage() {
  const handleDeleteAccount = () => {
    const confirmDelete = confirm(
      'Are you sure you want to delete your account? This cannot be undone.'
    );
    if (confirmDelete) {
      // TODO: Replace with actual API call to delete account
      alert('Your account has been deleted (placeholder).');
    }
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
        👤 Your Profile
      </h1>

      {/* User Info */}
      <div className="bg-white dark:bg-slate-900 shadow-md rounded-xl p-6 space-y-4">
        <div className="flex items-center space-x-4">
          <img
            src="/placeholder-profile.jpg"
            alt="Profile"
            className="w-20 h-20 rounded-full object-cover border-2 border-violet-600"
          />
          <div>
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
              John Doe
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-300">
              johndoe@example.com
            </p>
          </div>
        </div>

        <div className="flex space-x-4 mt-4">
          <button className="px-4 py-2 bg-violet-600 text-white rounded hover:bg-violet-700 transition">
            Edit Profile
          </button>
          <button className="px-4 py-2 border border-violet-600 text-violet-600 rounded hover:bg-violet-50 dark:hover:bg-slate-800 transition">
            Upload Avatar
          </button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard label="Total Matches" value="25" color="text-violet-600" />
        <StatCard label="Players Tracked" value="142" color="text-green-600" />
        <StatCard label="Reports Generated" value="87" color="text-blue-600" />
      </div>

      {/* Connected Accounts */}
      <InfoBox title="🔗 Connected Accounts">
        <ul className="space-y-2 text-sm">
          <li>✅ Google - johndoe@gmail.com</li>
          <li>✅ GitHub - @johndoe</li>
        </ul>
      </InfoBox>

      {/* Security */}
      <InfoBox title="🔐 Security">
        <ul className="space-y-2 text-sm">
          <li>• Password last changed: 3 months ago</li>
          <li>• Two-factor authentication: Enabled</li>
        </ul>
      </InfoBox>

      {/* Danger Zone */}
      <div className="mt-12 border-t pt-6 border-red-400">
        <h2 className="text-xl font-bold mb-4 text-red-600">⚠️ Danger Zone</h2>
        <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
          Deleting your account will remove all your match data and cannot be undone.
        </p>
        <button
          onClick={handleDeleteAccount}
          className="px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
        >
          Delete Account
        </button>
      </div>
    </div>
  );
}

// 🔧 Utility: Stat card component
function StatCard({
  label,
  value,
  color = 'text-gray-800',
}: {
  label: string;
  value: string;
  color?: string;
}) {
  return (
    <div className="bg-white dark:bg-slate-900 p-4 rounded-lg shadow-md text-center">
      <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
      <p className={`text-2xl font-bold ${color}`}>{value}</p>
    </div>
  );
}

// 🔧 Utility: Reusable box for sections
function InfoBox({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-md">
      <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
        {title}
      </h2>
      {children}
    </div>
  );
}
