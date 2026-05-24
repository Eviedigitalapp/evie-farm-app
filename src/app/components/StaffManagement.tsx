import { useState, useEffect } from 'react';
import { Clock, CheckCircle, User, FileText, AlertCircle, Users, MapPin, Camera, Image } from 'lucide-react';
import { useLocalStorage } from '../hooks/useLocalStorage';

interface CheckIn {
  id: number;
  staffName: string;
  animalSection: string;
  checkInTime: string;
  checkOutTime?: string;
  findings: string;
  status: 'checked-in' | 'checked-out';
  date: string;
  checkInLocation?: {
    latitude: number;
    longitude: number;
    timestamp: string;
  };
  checkOutLocation?: {
    latitude: number;
    longitude: number;
    timestamp: string;
  };
  photos?: string[];
}

type AnimalSection =
  | 'Chickens'
  | 'Ducks'
  | 'Guinea Fowls'
  | 'Quails'
  | 'Turkeys'
  | 'Rabbits'
  | 'Pigs'
  | 'Goats'
  | 'Cows'
  | 'Sheep';

export function StaffManagement() {
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const [checkIns, setCheckIns] = useLocalStorage<CheckIn[]>('staff-check-ins', [
    {
      id: 1,
      staffName: 'Moses Okello',
      animalSection: 'Pigs',
      checkInTime: '06:00',
      checkOutTime: '14:00',
      findings: 'All pigs fed and watered. Noticed 2 piglets showing signs of diarrhea - treated with oral rehydration. Cleaned sty thoroughly. Feed stock: 3 bags remaining.',
      status: 'checked-out',
      date: '2026-05-16'
    },
    {
      id: 2,
      staffName: 'Nakato Grace',
      animalSection: 'Chickens',
      checkInTime: '06:30',
      checkOutTime: '15:00',
      findings: 'Collected 95 eggs (5 broken). Fed 120 birds with layers mash. Refilled all water containers. One hen appears sick - isolated in separate cage. Cleaned coop and replaced bedding.',
      status: 'checked-out',
      date: '2026-05-16'
    },
    {
      id: 3,
      staffName: 'Samuel Kato',
      animalSection: 'Goats',
      checkInTime: '07:00',
      checkOutTime: '16:00',
      findings: 'Fed all 35 goats. Milked 12 dairy goats - total 18 liters collected. Dewormed 5 kids. One adult goat has mild foot rot - applied treatment. Moved herd to fresh pasture area.',
      status: 'checked-out',
      date: '2026-05-16'
    },
    {
      id: 4,
      staffName: 'Sarah Nambi',
      animalSection: 'Ducks',
      checkInTime: '06:45',
      checkOutTime: '14:30',
      findings: 'Fed 40 ducks. Collected 32 eggs. Cleaned pond area and refilled with fresh water. All ducks healthy and active. Feed remaining: approximately 2 bags.',
      status: 'checked-out',
      date: '2026-05-16'
    },
    {
      id: 5,
      staffName: 'Patrick Musoke',
      animalSection: 'Cows',
      checkInTime: '05:30',
      checkOutTime: '',
      findings: '',
      status: 'checked-in',
      date: '2026-05-16'
    },
    {
      id: 6,
      staffName: 'Aisha Nalongo',
      animalSection: 'Rabbits',
      checkInTime: '08:00',
      checkOutTime: '',
      findings: '',
      status: 'checked-in',
      date: '2026-05-16'
    },
  ]);

  const [showCheckInForm, setShowCheckInForm] = useState(false);
  const [showCheckOutForm, setShowCheckOutForm] = useState(false);
  const [selectedCheckIn, setSelectedCheckIn] = useState<CheckIn | null>(null);
  const [showReportDetails, setShowReportDetails] = useState(false);

  const [checkInFormData, setCheckInFormData] = useState({
    staffName: '',
    animalSection: '' as AnimalSection | '',
  });

  const [checkOutFormData, setCheckOutFormData] = useState({
    findings: '',
    photos: [] as string[],
  });

  const [currentLocation, setCurrentLocation] = useState<{latitude: number; longitude: number} | null>(null);
  const [locationError, setLocationError] = useState<string>('');

  // Get GPS location
  const getCurrentLocation = () => {
    return new Promise<{latitude: number; longitude: number}>((resolve, reject) => {
      if (!navigator.geolocation) {
        reject('Geolocation is not supported by your browser');
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
        },
        (error) => {
          reject(error.message);
        }
      );
    });
  };

  // Load current location on mount
  useEffect(() => {
    getCurrentLocation()
      .then(location => setCurrentLocation(location))
      .catch(error => setLocationError(error));
  }, []);

  // Handle photo upload
  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newPhotos: string[] = [];
      Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onloadend = () => {
          newPhotos.push(reader.result as string);
          if (newPhotos.length === files.length) {
            setCheckOutFormData(prev => ({
              ...prev,
              photos: [...prev.photos, ...newPhotos]
            }));
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removePhoto = (index: number) => {
    setCheckOutFormData(prev => ({
      ...prev,
      photos: prev.photos.filter((_, i) => i !== index)
    }));
  };

  const animalSections: AnimalSection[] = [
    'Chickens',
    'Ducks',
    'Guinea Fowls',
    'Quails',
    'Turkeys',
    'Rabbits',
    'Pigs',
    'Goats',
    'Cows',
    'Sheep',
  ];

  const currentlyCheckedIn = checkIns.filter(c => c.status === 'checked-in');
  const todayCompleted = checkIns.filter(c => c.status === 'checked-out' && c.date === '2026-05-16');

  const handleCheckIn = async () => {
    if (checkInFormData.staffName && checkInFormData.animalSection) {
      const now = new Date();
      let checkInLocation = undefined;

      try {
        const location = await getCurrentLocation();
        checkInLocation = {
          latitude: location.latitude,
          longitude: location.longitude,
          timestamp: now.toISOString()
        };
      } catch (error) {
        console.log('Could not get location:', error);
      }

      const newCheckIn: CheckIn = {
        id: checkIns.length + 1,
        staffName: checkInFormData.staffName,
        animalSection: checkInFormData.animalSection,
        checkInTime: now.toTimeString().slice(0, 5),
        findings: '',
        status: 'checked-in',
        date: new Date().toISOString().split('T')[0],
        checkInLocation
      };
      setCheckIns([...checkIns, newCheckIn]);
      setCheckInFormData({ staffName: '', animalSection: '' });
      setShowCheckInForm(false);
    }
  };

  const handleCheckOut = async (checkInId: number) => {
    const now = new Date();
    let checkOutLocation = undefined;

    try {
      const location = await getCurrentLocation();
      checkOutLocation = {
        latitude: location.latitude,
        longitude: location.longitude,
        timestamp: now.toISOString()
      };
    } catch (error) {
      console.log('Could not get location:', error);
    }

    setCheckIns(checkIns.map(c => {
      if (c.id === checkInId) {
        return {
          ...c,
          checkOutTime: now.toTimeString().slice(0, 5),
          findings: checkOutFormData.findings,
          photos: checkOutFormData.photos,
          checkOutLocation,
          status: 'checked-out' as const
        };
      }
      return c;
    }));
    setCheckOutFormData({ findings: '', photos: [] });
    setShowCheckOutForm(false);
    setSelectedCheckIn(null);
  };

  const calculateDuration = (checkIn: string, checkOut?: string) => {
    if (!checkOut) return 'In Progress';
    const [inHour, inMin] = checkIn.split(':').map(Number);
    const [outHour, outMin] = checkOut.split(':').map(Number);
    const totalMinutes = (outHour * 60 + outMin) - (inHour * 60 + inMin);
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}h ${minutes}m`;
  };

  const getSectionIcon = (section: string) => {
    return '🐾';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-semibold mb-2">Staff Management & Livestock Reports</h1>
          <p className="text-gray-600">{today}</p>
        </div>
        <button
          onClick={() => setShowCheckInForm(!showCheckInForm)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <User className="w-4 h-4" />
          Check In Staff
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <Users className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-gray-600">Currently On Duty</p>
              <p className="font-semibold">{currentlyCheckedIn.length} Staff Members</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <CheckCircle className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-gray-600">Completed Today</p>
              <p className="font-semibold">{todayCompleted.length} Shifts</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <FileText className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-gray-600">Reports Submitted</p>
              <p className="font-semibold">{todayCompleted.length} Reports</p>
            </div>
          </div>
        </div>
      </div>

      {/* Check-In Form */}
      {showCheckInForm && (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="font-semibold mb-4">Check In Staff Member</h2>

          {currentLocation && (
            <div className="mb-4 flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg">
              <MapPin className="w-4 h-4 text-green-600" />
              <span className="text-green-700">GPS Location Ready - Check-in will be verified</span>
            </div>
          )}

          {locationError && (
            <div className="mb-4 flex items-center gap-2 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <AlertCircle className="w-4 h-4 text-yellow-600" />
              <span className="text-yellow-700">GPS unavailable: {locationError}</span>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 mb-2">Staff Name</label>
              <input
                type="text"
                placeholder="Enter staff name"
                value={checkInFormData.staffName}
                onChange={(e) => setCheckInFormData({ ...checkInFormData, staffName: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Animal Section</label>
              <select
                value={checkInFormData.animalSection}
                onChange={(e) => setCheckInFormData({ ...checkInFormData, animalSection: e.target.value as AnimalSection })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select section</option>
                {animalSections.map((section) => (
                  <option key={section} value={section}>{section}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex gap-3 mt-4">
            <button
              onClick={handleCheckIn}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Check In Now
            </button>
            <button
              onClick={() => setShowCheckInForm(false)}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Check-Out Form */}
      {showCheckOutForm && selectedCheckIn && (
        <div className="bg-white rounded-lg border-2 border-blue-500 p-6">
          <h2 className="font-semibold mb-2">Check Out: {selectedCheckIn.staffName}</h2>
          <p className="text-gray-600 mb-4">
            Section: {selectedCheckIn.animalSection} | Started: {selectedCheckIn.checkInTime}
          </p>

          {currentLocation && (
            <div className="mb-4 flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg">
              <MapPin className="w-4 h-4 text-green-600" />
              <span className="text-green-700">GPS Location Ready - Check-out will be verified</span>
            </div>
          )}
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-2">Shift Report & Findings</label>
              <textarea
                placeholder="Describe all activities, observations, issues found, treatments given, feed/water status, egg collection, health concerns, etc."
                value={checkOutFormData.findings}
                onChange={(e) => setCheckOutFormData({ ...checkOutFormData, findings: e.target.value })}
                rows={6}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <p className="text-gray-500 mt-2">Be detailed: Include feeding, watering, cleaning, health observations, egg/milk collection, issues, and stock levels.</p>
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Upload Photos (Optional)</label>
              <div className="flex items-center gap-3">
                <label className="flex items-center gap-2 px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-200 transition-colors">
                  <Camera className="w-4 h-4" />
                  <span>Add Photos</span>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handlePhotoUpload}
                    className="hidden"
                  />
                </label>
                <p className="text-gray-500">Upload photos of issues, conditions, or activities</p>
              </div>

              {checkOutFormData.photos.length > 0 && (
                <div className="mt-3 grid grid-cols-3 gap-3">
                  {checkOutFormData.photos.map((photo, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={photo}
                        alt={`Upload ${index + 1}`}
                        className="w-full h-24 object-cover rounded-lg border border-gray-300"
                      />
                      <button
                        onClick={() => removePhoto(index)}
                        className="absolute top-1 right-1 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="flex gap-3 mt-4">
            <button
              onClick={() => handleCheckOut(selectedCheckIn.id)}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Complete Check Out
            </button>
            <button
              onClick={() => {
                setShowCheckOutForm(false);
                setSelectedCheckIn(null);
                setCheckOutFormData({ findings: '', photos: [] });
              }}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Report Details Modal */}
      {showReportDetails && selectedCheckIn && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="font-semibold mb-1">Shift Report Details</h2>
                <p className="text-gray-600">{selectedCheckIn.date}</p>
              </div>
              <button
                onClick={() => {
                  setShowReportDetails(false);
                  setSelectedCheckIn(null);
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-600 mb-1">Staff Member</p>
                  <p className="font-semibold">{selectedCheckIn.staffName}</p>
                </div>
                <div>
                  <p className="text-gray-600 mb-1">Animal Section</p>
                  <p className="font-semibold">{selectedCheckIn.animalSection}</p>
                </div>
                <div>
                  <p className="text-gray-600 mb-1">Check In</p>
                  <p className="font-semibold">{selectedCheckIn.checkInTime}</p>
                </div>
                <div>
                  <p className="text-gray-600 mb-1">Check Out</p>
                  <p className="font-semibold">{selectedCheckIn.checkOutTime || 'Still on duty'}</p>
                </div>
                <div>
                  <p className="text-gray-600 mb-1">Duration</p>
                  <p className="font-semibold">{calculateDuration(selectedCheckIn.checkInTime, selectedCheckIn.checkOutTime)}</p>
                </div>
              </div>

              {(selectedCheckIn.checkInLocation || selectedCheckIn.checkOutLocation) && (
                <div className="border-t pt-4">
                  <p className="text-gray-700 font-semibold mb-2">GPS Locations</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {selectedCheckIn.checkInLocation && (
                      <div className="bg-gray-50 rounded-lg p-3">
                        <div className="flex items-center gap-2 mb-1">
                          <MapPin className="w-4 h-4 text-green-600" />
                          <p className="font-semibold text-gray-700">Check-In Location</p>
                        </div>
                        <p className="text-gray-600">
                          {selectedCheckIn.checkInLocation.latitude.toFixed(6)}, {selectedCheckIn.checkInLocation.longitude.toFixed(6)}
                        </p>
                        <a
                          href={`https://www.google.com/maps?q=${selectedCheckIn.checkInLocation.latitude},${selectedCheckIn.checkInLocation.longitude}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-700 text-sm"
                        >
                          View on Map →
                        </a>
                      </div>
                    )}
                    {selectedCheckIn.checkOutLocation && (
                      <div className="bg-gray-50 rounded-lg p-3">
                        <div className="flex items-center gap-2 mb-1">
                          <MapPin className="w-4 h-4 text-red-600" />
                          <p className="font-semibold text-gray-700">Check-Out Location</p>
                        </div>
                        <p className="text-gray-600">
                          {selectedCheckIn.checkOutLocation.latitude.toFixed(6)}, {selectedCheckIn.checkOutLocation.longitude.toFixed(6)}
                        </p>
                        <a
                          href={`https://www.google.com/maps?q=${selectedCheckIn.checkOutLocation.latitude},${selectedCheckIn.checkOutLocation.longitude}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-700 text-sm"
                        >
                          View on Map →
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              )}

              <div className="border-t pt-4">
                <p className="text-gray-700 font-semibold mb-2">Findings & Report</p>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-gray-900 whitespace-pre-wrap">
                    {selectedCheckIn.findings || 'No report submitted yet.'}
                  </p>
                </div>
              </div>

              {selectedCheckIn.photos && selectedCheckIn.photos.length > 0 && (
                <div className="border-t pt-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Image className="w-5 h-5 text-blue-600" />
                    <p className="text-gray-700 font-semibold">Photos ({selectedCheckIn.photos.length})</p>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {selectedCheckIn.photos.map((photo, index) => (
                      <a
                        key={index}
                        href={photo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative"
                      >
                        <img
                          src={photo}
                          alt={`Photo ${index + 1}`}
                          className="w-full h-32 object-cover rounded-lg border border-gray-300 group-hover:border-blue-500 transition-colors"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 rounded-lg transition-opacity flex items-center justify-center">
                          <span className="text-white opacity-0 group-hover:opacity-100 text-sm font-semibold">View Full Size</span>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={() => {
                setShowReportDetails(false);
                setSelectedCheckIn(null);
              }}
              className="mt-4 w-full px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Currently Checked In Staff */}
      {currentlyCheckedIn.length > 0 && (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-4">
            <Clock className="w-5 h-5 text-blue-600" />
            <h2 className="font-semibold">Currently On Duty</h2>
          </div>
          <div className="space-y-3">
            {currentlyCheckedIn.map((checkIn) => (
              <div key={checkIn.id} className="flex items-center justify-between p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="text-2xl">{getSectionIcon(checkIn.animalSection)}</div>
                  <div>
                    <p className="font-semibold">{checkIn.staffName}</p>
                    <p className="text-gray-600">{checkIn.animalSection}</p>
                    {checkIn.checkInLocation && (
                      <div className="flex items-center gap-1 text-green-600 mt-1">
                        <MapPin className="w-3 h-3" />
                        <span className="text-sm">Location Verified</span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-gray-600">Started</p>
                    <p className="font-semibold">{checkIn.checkInTime}</p>
                    <p className="text-gray-500">{calculateDuration(checkIn.checkInTime)}</p>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedCheckIn(checkIn);
                      setShowCheckOutForm(true);
                    }}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Check Out
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Today's Completed Shifts with Reports */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center gap-2 mb-4">
          <FileText className="w-5 h-5 text-green-600" />
          <h2 className="font-semibold">Today's Completed Shifts & Reports</h2>
        </div>
        <div className="space-y-3">
          {todayCompleted.length === 0 ? (
            <p className="text-gray-500 text-center py-4">No completed shifts yet today</p>
          ) : (
            todayCompleted.map((checkIn) => (
              <div key={checkIn.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">{getSectionIcon(checkIn.animalSection)}</div>
                    <div>
                      <p className="font-semibold">{checkIn.staffName}</p>
                      <p className="text-gray-600">{checkIn.animalSection}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-gray-600">
                      {checkIn.checkInTime} - {checkIn.checkOutTime}
                    </p>
                    <p className="font-semibold text-gray-700">
                      {calculateDuration(checkIn.checkInTime, checkIn.checkOutTime)}
                    </p>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-3 mb-3">
                  <p className="text-gray-700 line-clamp-2">{checkIn.findings}</p>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {checkIn.checkInLocation && (
                      <div className="flex items-center gap-1 text-green-600">
                        <MapPin className="w-4 h-4" />
                        <span className="text-sm">GPS</span>
                      </div>
                    )}
                    {checkIn.photos && checkIn.photos.length > 0 && (
                      <div className="flex items-center gap-1 text-blue-600">
                        <Image className="w-4 h-4" />
                        <span className="text-sm">{checkIn.photos.length} Photo{checkIn.photos.length > 1 ? 's' : ''}</span>
                      </div>
                    )}
                  </div>
                  <button
                    onClick={() => {
                      setSelectedCheckIn(checkIn);
                      setShowReportDetails(true);
                    }}
                    className="text-blue-600 hover:text-blue-700 font-semibold"
                  >
                    View Full Report →
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Section Coverage Overview */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="font-semibold mb-4">Today's Section Coverage</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {animalSections.map((section) => {
            const hasStaff = checkIns.some(c => c.animalSection === section && c.date === '2026-05-16');
            const isActive = currentlyCheckedIn.some(c => c.animalSection === section);
            return (
              <div
                key={section}
                className={`p-4 rounded-lg border-2 ${
                  isActive
                    ? 'border-green-500 bg-green-50'
                    : hasStaff
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 bg-gray-50'
                }`}
              >
                <p className="font-semibold mb-1">{section}</p>
                {isActive ? (
                  <div className="flex items-center gap-1 text-green-600">
                    <div className="w-2 h-2 bg-green-600 rounded-full animate-pulse" />
                    <p className="text-sm">On Duty</p>
                  </div>
                ) : hasStaff ? (
                  <p className="text-blue-600 text-sm">Completed</p>
                ) : (
                  <p className="text-gray-500 text-sm">Not Covered</p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
