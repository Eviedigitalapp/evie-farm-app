import { useState } from 'react';
import { Settings as SettingsIcon, Plus, Trash2, Edit2, Save, X, Users, Shield, Lock, Key } from 'lucide-react';
import { User } from './Login';
import { SMSSettings } from './SMSSettings';
import { OfflineSyncStatus } from './OfflineSyncStatus';

type SettingCategory = 'change-password' | 'animals' | 'crops' | 'staff' | 'suppliers' | 'vets' | 'feed-types' | 'expense-categories' | 'income-categories' | 'user-management' | 'sms-notifications' | 'offline-sync';

interface SettingsProps {
  currentUser?: User;
  onUpdatePassword?: (newPassword: string) => void;
}

interface SystemUser {
  id: number;
  name: string;
  email: string;
  role: 'owner' | 'manager' | 'accountant' | 'sales' | 'worker';
  active: boolean;
}

export function Settings({ currentUser, onUpdatePassword }: SettingsProps = {}) {
  const [activeCategory, setActiveCategory] = useState<SettingCategory>('change-password');

  // Change Password State
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState('');

  // Animal Types
  const [animalTypes, setAnimalTypes] = useState<string[]>([
    'Chickens', 'Ducks', 'Guinea Fowls', 'Quails', 'Turkeys',
    'Rabbits', 'Pigs', 'Goats', 'Cows', 'Sheep'
  ]);
  const [newAnimal, setNewAnimal] = useState('');

  // Crop Types
  const [cropTypes, setCropTypes] = useState<string[]>([
    'Maize', 'Beans', 'Cassava', 'Sweet Potatoes', 'Coffee',
    'Bananas', 'Tomatoes', 'Cabbage', 'Onions', 'Groundnuts'
  ]);
  const [newCrop, setNewCrop] = useState('');

  // Staff Members
  const [staffMembers, setStaffMembers] = useState<string[]>([
    'Moses Okello', 'Nakato Grace', 'Samuel Kato', 'Sarah Nambi',
    'Patrick Musoke', 'Aisha Nalongo', 'John Ssemakula', 'Mary Namuddu'
  ]);
  const [newStaff, setNewStaff] = useState('');

  // Suppliers
  const [suppliers, setSuppliers] = useState<string[]>([
    'Uganda Feeds Ltd', 'Nuvita Feeds', 'East Africa Feeds',
    'Kampala Veterinary Supplies', 'Agro Input Center'
  ]);
  const [newSupplier, setNewSupplier] = useState('');

  // Veterinarians
  const [veterinarians, setVeterinarians] = useState<string[]>([
    'Dr. Nakato', 'Dr. Moses Okello', 'Dr. Samuel Kato',
    'Dr. Patrick Musoke', 'Dr. Aisha Nalongo'
  ]);
  const [newVet, setNewVet] = useState('');

  // Feed Types
  const [feedTypes, setFeedTypes] = useState<string[]>([
    'Layers Mash', 'Broiler Starter', 'Broiler Finisher',
    'Pig Concentrate', 'Dairy Meal', 'Goat Pellets', 'Rabbit Pellets'
  ]);
  const [newFeedType, setNewFeedType] = useState('');

  // Expense Categories
  const [expenseCategories, setExpenseCategories] = useState<string[]>([
    'Feed Purchase', 'Veterinary Services', 'Medication', 'Labor',
    'Equipment', 'Utilities', 'Transport', 'Maintenance', 'Other'
  ]);
  const [newExpenseCategory, setNewExpenseCategory] = useState('');

  // Income Categories
  const [incomeCategories, setIncomeCategories] = useState<string[]>([
    'Egg Sales', 'Livestock Sales', 'Crop Sales', 'Milk Sales',
    'Manure Sales', 'Services', 'Other'
  ]);
  const [newIncomeCategory, setNewIncomeCategory] = useState('');

  // User Management
  const [systemUsers, setSystemUsers] = useState<SystemUser[]>([
    { id: 1, name: 'Farm Owner', email: 'owner@farm.com', role: 'owner', active: true },
    { id: 2, name: 'Farm Manager', email: 'manager@farm.com', role: 'manager', active: true },
    { id: 3, name: 'Accountant', email: 'accountant@farm.com', role: 'accountant', active: true },
    { id: 4, name: 'Sales Officer', email: 'sales@farm.com', role: 'sales', active: true },
    { id: 5, name: 'Farm Worker', email: 'worker@farm.com', role: 'worker', active: true },
  ]);

  const [showAddUser, setShowAddUser] = useState(false);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    role: 'worker' as SystemUser['role']
  });

  const categories = [
    { id: 'change-password' as SettingCategory, label: 'Change Password', icon: '🔐' },
    { id: 'user-management' as SettingCategory, label: 'User Management', icon: '👤' },
    { id: 'sms-notifications' as SettingCategory, label: 'SMS Notifications', icon: '📱' },
    { id: 'offline-sync' as SettingCategory, label: 'Offline Sync', icon: '🔄' },
    { id: 'animals' as SettingCategory, label: 'Animal Types', icon: '🐾' },
    { id: 'crops' as SettingCategory, label: 'Crop Types', icon: '🌱' },
    { id: 'staff' as SettingCategory, label: 'Staff Members', icon: '👥' },
    { id: 'suppliers' as SettingCategory, label: 'Suppliers', icon: '🏪' },
    { id: 'vets' as SettingCategory, label: 'Veterinarians', icon: '👨‍⚕️' },
    { id: 'feed-types' as SettingCategory, label: 'Feed Types', icon: '🌾' },
    { id: 'expense-categories' as SettingCategory, label: 'Expense Categories', icon: '💸' },
    { id: 'income-categories' as SettingCategory, label: 'Income Categories', icon: '💰' },
  ];

  const getCurrentList = () => {
    switch (activeCategory) {
      case 'animals': return animalTypes;
      case 'crops': return cropTypes;
      case 'staff': return staffMembers;
      case 'suppliers': return suppliers;
      case 'vets': return veterinarians;
      case 'feed-types': return feedTypes;
      case 'expense-categories': return expenseCategories;
      case 'income-categories': return incomeCategories;
      default: return [];
    }
  };

  const getCurrentInput = () => {
    switch (activeCategory) {
      case 'animals': return newAnimal;
      case 'crops': return newCrop;
      case 'staff': return newStaff;
      case 'suppliers': return newSupplier;
      case 'vets': return newVet;
      case 'feed-types': return newFeedType;
      case 'expense-categories': return newExpenseCategory;
      case 'income-categories': return newIncomeCategory;
      default: return '';
    }
  };

  const setCurrentInput = (value: string) => {
    switch (activeCategory) {
      case 'animals': setNewAnimal(value); break;
      case 'crops': setNewCrop(value); break;
      case 'staff': setNewStaff(value); break;
      case 'suppliers': setNewSupplier(value); break;
      case 'vets': setNewVet(value); break;
      case 'feed-types': setNewFeedType(value); break;
      case 'expense-categories': setNewExpenseCategory(value); break;
      case 'income-categories': setNewIncomeCategory(value); break;
    }
  };

  const handleAdd = () => {
    const input = getCurrentInput().trim();
    if (!input) return;

    switch (activeCategory) {
      case 'animals':
        setAnimalTypes([...animalTypes, input]);
        setNewAnimal('');
        break;
      case 'crops':
        setCropTypes([...cropTypes, input]);
        setNewCrop('');
        break;
      case 'staff':
        setStaffMembers([...staffMembers, input]);
        setNewStaff('');
        break;
      case 'suppliers':
        setSuppliers([...suppliers, input]);
        setNewSupplier('');
        break;
      case 'vets':
        setVeterinarians([...veterinarians, input]);
        setNewVet('');
        break;
      case 'feed-types':
        setFeedTypes([...feedTypes, input]);
        setNewFeedType('');
        break;
      case 'expense-categories':
        setExpenseCategories([...expenseCategories, input]);
        setNewExpenseCategory('');
        break;
      case 'income-categories':
        setIncomeCategories([...incomeCategories, input]);
        setNewIncomeCategory('');
        break;
    }
  };

  const handleDelete = (item: string) => {
    switch (activeCategory) {
      case 'animals':
        setAnimalTypes(animalTypes.filter(a => a !== item));
        break;
      case 'crops':
        setCropTypes(cropTypes.filter(c => c !== item));
        break;
      case 'staff':
        setStaffMembers(staffMembers.filter(s => s !== item));
        break;
      case 'suppliers':
        setSuppliers(suppliers.filter(s => s !== item));
        break;
      case 'vets':
        setVeterinarians(veterinarians.filter(v => v !== item));
        break;
      case 'feed-types':
        setFeedTypes(feedTypes.filter(f => f !== item));
        break;
      case 'expense-categories':
        setExpenseCategories(expenseCategories.filter(e => e !== item));
        break;
      case 'income-categories':
        setIncomeCategories(incomeCategories.filter(i => i !== item));
        break;
    }
  };

  const getPlaceholder = () => {
    switch (activeCategory) {
      case 'animals': return 'e.g., Donkeys, Fish, Bees';
      case 'crops': return 'e.g., Rice, Sunflower, Millet';
      case 'staff': return 'e.g., John Doe';
      case 'suppliers': return 'e.g., ABC Feeds & Supplies';
      case 'vets': return 'e.g., Dr. Jane Smith';
      case 'feed-types': return 'e.g., Chick Starter, Grower Mash';
      case 'expense-categories': return 'e.g., Seeds, Fertilizer';
      case 'income-categories': return 'e.g., Product Sales, Consultancy';
      default: return '';
    }
  };

  const handleAddUser = () => {
    if (newUser.name && newUser.email) {
      const user: SystemUser = {
        id: systemUsers.length + 1,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        active: true
      };
      setSystemUsers([...systemUsers, user]);
      setNewUser({ name: '', email: '', role: 'worker' });
      setShowAddUser(false);
    }
  };

  const handleToggleUserStatus = (userId: number) => {
    setSystemUsers(systemUsers.map(u =>
      u.id === userId ? { ...u, active: !u.active } : u
    ));
  };

  const handleDeleteUser = (userId: number) => {
    if (confirm('Are you sure you want to delete this user?')) {
      setSystemUsers(systemUsers.filter(u => u.id !== userId));
    }
  };

  const getRoleBadgeColor = (role: SystemUser['role']) => {
    switch (role) {
      case 'owner': return 'bg-purple-100 text-purple-700';
      case 'manager': return 'bg-blue-100 text-blue-700';
      case 'accountant': return 'bg-green-100 text-green-700';
      case 'sales': return 'bg-orange-100 text-orange-700';
      case 'worker': return 'bg-gray-100 text-gray-700';
    }
  };

  const handleChangePassword = () => {
    setPasswordError('');
    setPasswordSuccess('');

    // Validation
    if (!passwordForm.currentPassword || !passwordForm.newPassword || !passwordForm.confirmPassword) {
      setPasswordError('All fields are required');
      return;
    }

    if (currentUser && passwordForm.currentPassword !== currentUser.password) {
      setPasswordError('Current password is incorrect');
      return;
    }

    if (passwordForm.newPassword.length < 6) {
      setPasswordError('New password must be at least 6 characters');
      return;
    }

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordError('New passwords do not match');
      return;
    }

    // Update password
    if (onUpdatePassword) {
      onUpdatePassword(passwordForm.newPassword);
      setPasswordSuccess('Password changed successfully!');
      setPasswordForm({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });

      // Clear success message after 3 seconds
      setTimeout(() => setPasswordSuccess(''), 3000);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-semibold mb-2">Farm Settings & Customization</h1>
        <p className="text-gray-600">Customize your farm's data to suit your specific needs</p>
      </div>

      {/* Info Alert */}
      <div className="bg-blue-50 border-l-4 border-blue-600 p-4 rounded-lg">
        <div className="flex items-start gap-3">
          <SettingsIcon className="w-5 h-5 text-blue-600 mt-0.5" />
          <div>
            <h3 className="font-semibold text-blue-900 mb-1">Customize Your Farm Data</h3>
            <p className="text-blue-700">
              Add, edit, or remove items to match your farm's specific requirements. These changes will apply across the entire application.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Category Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <h2 className="font-semibold mb-3">Categories</h2>
            <div className="space-y-1">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors text-left ${
                    activeCategory === category.id
                      ? 'bg-green-50 text-green-700 font-semibold'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <span className="text-xl">{category.icon}</span>
                  <span>{category.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="lg:col-span-3">
          {activeCategory === 'change-password' ? (
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="mb-6">
                <h2 className="font-semibold mb-2">Change Your Password</h2>
                <p className="text-gray-600">Update your account password for security</p>
              </div>

              {currentUser && (
                <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-blue-900">
                    <strong>Current User:</strong> {currentUser.name} ({currentUser.email})
                  </p>
                </div>
              )}

              {passwordError && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700">
                  {passwordError}
                </div>
              )}

              {passwordSuccess && (
                <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg text-green-700 flex items-center gap-2">
                  <Save className="w-5 h-5" />
                  {passwordSuccess}
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 mb-2 font-semibold">Current Password</label>
                  <input
                    type="password"
                    placeholder="Enter your current password"
                    value={passwordForm.currentPassword}
                    onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-2 font-semibold">New Password</label>
                  <input
                    type="password"
                    placeholder="Enter new password (min 6 characters)"
                    value={passwordForm.newPassword}
                    onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <p className="text-gray-500 mt-1">Minimum 6 characters required</p>
                </div>

                <div>
                  <label className="block text-gray-700 mb-2 font-semibold">Confirm New Password</label>
                  <input
                    type="password"
                    placeholder="Re-enter new password"
                    value={passwordForm.confirmPassword}
                    onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    onClick={handleChangePassword}
                    className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold"
                  >
                    <Key className="w-5 h-5" />
                    Update Password
                  </button>
                  <button
                    onClick={() => {
                      setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
                      setPasswordError('');
                      setPasswordSuccess('');
                    }}
                    className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Clear
                  </button>
                </div>
              </div>

              <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <h3 className="font-semibold text-yellow-900 mb-2">Password Security Tips:</h3>
                <ul className="text-sm text-yellow-800 space-y-1 list-disc list-inside">
                  <li>Use at least 8-12 characters for stronger security</li>
                  <li>Include uppercase, lowercase, numbers, and symbols</li>
                  <li>Don't use personal information (name, birthday, etc.)</li>
                  <li>Change your password regularly (every 3-6 months)</li>
                  <li>Never share your password with anyone</li>
                </ul>
              </div>
            </div>
          ) : activeCategory === 'user-management' ? (
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="font-semibold">User Management</h2>
                  <p className="text-gray-600">{systemUsers.length} user{systemUsers.length !== 1 ? 's' : ''}</p>
                </div>
                <button
                  onClick={() => setShowAddUser(!showAddUser)}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Add User
                </button>
              </div>

              {/* Add User Form */}
              {showAddUser && (
                <div className="mb-6 p-4 border border-gray-200 rounded-lg bg-gray-50">
                  <h3 className="font-semibold mb-4">Add New User</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-700 mb-2">Name</label>
                      <input
                        type="text"
                        placeholder="User's full name"
                        value={newUser.name}
                        onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-2">Email</label>
                      <input
                        type="email"
                        placeholder="user@example.com"
                        value={newUser.email}
                        onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-gray-700 mb-2">Role</label>
                      <select
                        value={newUser.role}
                        onChange={(e) => setNewUser({ ...newUser, role: e.target.value as SystemUser['role'] })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="worker">Worker</option>
                        <option value="sales">Sales</option>
                        <option value="accountant">Accountant</option>
                        <option value="manager">Manager</option>
                        <option value="owner">Owner</option>
                      </select>
                    </div>
                  </div>
                  <div className="flex gap-3 mt-4">
                    <button
                      onClick={handleAddUser}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                      Create User
                    </button>
                    <button
                      onClick={() => setShowAddUser(false)}
                      className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              {/* Users List */}
              <div className="space-y-3">
                {systemUsers.map((user) => (
                  <div
                    key={user.id}
                    className={`p-4 border border-gray-200 rounded-lg ${
                      user.active ? 'bg-white' : 'bg-gray-50 opacity-60'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold ${
                          user.role === 'owner' ? 'bg-purple-600' :
                          user.role === 'manager' ? 'bg-blue-600' :
                          user.role === 'accountant' ? 'bg-green-600' :
                          user.role === 'sales' ? 'bg-orange-600' :
                          'bg-gray-600'
                        }`}>
                          {user.name.charAt(0)}
                        </div>
                        <div>
                          <h3 className="font-semibold">{user.name}</h3>
                          <p className="text-gray-600">{user.email}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className={`px-2 py-1 rounded text-sm font-semibold ${getRoleBadgeColor(user.role)}`}>
                              {user.role.toUpperCase()}
                            </span>
                            {!user.active && (
                              <span className="px-2 py-1 bg-red-100 text-red-700 rounded text-sm font-semibold">
                                INACTIVE
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleToggleUserStatus(user.id)}
                          className={`px-3 py-1 rounded-lg transition-colors ${
                            user.active
                              ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                              : 'bg-green-100 text-green-700 hover:bg-green-200'
                          }`}
                        >
                          {user.active ? 'Deactivate' : 'Activate'}
                        </button>
                        <button
                          onClick={() => handleDeleteUser(user.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete User"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Role Permissions Info */}
                    <div className="mt-3 p-3 bg-gray-50 rounded-lg text-sm text-gray-700">
                      <strong>Access:</strong>{' '}
                      {user.role === 'owner' && 'Full system access'}
                      {user.role === 'manager' && 'Operations, staff, livestock, crops'}
                      {user.role === 'accountant' && 'Financials, reports, inventory'}
                      {user.role === 'sales' && 'Sales, income, product records'}
                      {user.role === 'worker' && 'Daily tasks, check-in/out only'}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : activeCategory === 'sms-notifications' ? (
            <SMSSettings />
          ) : activeCategory === 'offline-sync' ? (
            <OfflineSyncStatus />
          ) : (
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="font-semibold">
                    {categories.find(c => c.id === activeCategory)?.label}
                  </h2>
                  <p className="text-gray-600">
                    {getCurrentList().length} item{getCurrentList().length !== 1 ? 's' : ''}
                  </p>
                </div>
              </div>

              {/* Add New Item */}
              <div className="mb-6">
                <label className="block text-gray-700 mb-2 font-semibold">Add New Item</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder={getPlaceholder()}
                    value={getCurrentInput()}
                    onChange={(e) => setCurrentInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleAdd()}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    onClick={handleAdd}
                    disabled={!getCurrentInput().trim()}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                  >
                    <Plus className="w-4 h-4" />
                    Add
                  </button>
                </div>
              </div>

              {/* Items List */}
              <div>
                <h3 className="font-semibold mb-3">Current Items</h3>
                {getCurrentList().length === 0 ? (
                  <p className="text-gray-500 text-center py-8">No items added yet</p>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {getCurrentList().map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <span className="font-medium text-gray-900">{item}</span>
                        <button
                          onClick={() => handleDelete(item)}
                          className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Save Notice */}
          <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <p className="text-yellow-800">
              <strong>Note:</strong> Changes are applied immediately but are not saved permanently.
              To save your customizations permanently, you'll need to enable backend storage.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
