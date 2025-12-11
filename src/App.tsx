import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Search, ArrowLeft, ArrowRight, Check } from 'lucide-react';
import './App.css'

interface Animal {
  id: number;
  givenName: string;
  commonName: string;
  scientificName: string;
  group: string;
  estimatedDOB: string;
  ageAtAdmission: number;
  sex: string;
  microchipNumber?: string;
  placement?: string;
  otherDetails?: string;
  // rescue details
  incomeReason: string;
  when: string;
  where: string;
  kmFromTheCenter: string;
  latitude: number;
  longitude: number;
  captureNeeded: boolean;
  whoBrought: string;
  whoCalled: string;
  callDetails?: string;
  otherRescueDetails?: string;
  // clinical information
  arrivalWeight: number;
  hadTreatment: boolean;
  isUnderVigilance: boolean;
  isInClinical: boolean;
  injuries: string;
  clinicalEvolution: string;
  necropsyDetails: string;
  // status
  status: string;
}

interface AnimalForm {
  id: number;
  givenName: string;
  commonName: string;
  scientificName: string;
  group: string;
  estimatedDOB: string;
  ageAtAdmission: number;
  sex: string;
  microchipNumber?: string;
  placement?: string;
  otherDetails?: string;
  // rescue details
  incomeReason: string;
  when: string;
  where: string;
  kmFromTheCenter: string;
  latitude: number;
  longitude: number;
  captureNeeded: boolean;
  whoBrought: string;
  whoCalled: string;
  callDetails?: string;
  otherRescueDetails?: string;
  // clinical information
  arrivalWeight: number;
  hadTreatment: boolean;
  isUnderVigilance: boolean;
  isInClinical: boolean;
  injuries: string;
  clinicalEvolution: string;
  necropsyDetails: string;
  // status
  status: string;
}

const emptyAnimal: Animal = {
  id: 0,
  givenName: '',
  commonName: '',
  scientificName: '',
  group: '',
  estimatedDOB: '',
  ageAtAdmission: 0,
  sex: '',
  incomeReason: '',
  when: '',
  where: '',
  kmFromTheCenter: '',
  latitude: 0,
  longitude: 0,
  captureNeeded: false,
  whoBrought: '',
  whoCalled: '',
  arrivalWeight: 0,
  hadTreatment: false,
  isUnderVigilance: false,
  isInClinical: false,
  injuries: '',
  clinicalEvolution: '',
  necropsyDetails: '',
  status: '',
};

export default function AnimalManager() {

  const [animals, setAnimals] = useState([
    {
      id: 1,
      givenName: 'Buddy',
      commonName: 'Dog',
      scientificName: 'Canis lupus familiaris',
      group: 'Mammal',
      estimatedDOB: '2022-03-15T08:00:00.000Z',
      ageAtAdmission: 6,
      sex: 'Female',
      microchipNumber: '1234567890',
      placement: 'Home',
      otherDetails: 'Buddy is a friendly dog who loves to play fetch and cuddle. She is currently under the care of her owner, John Doe.',
      incomeReason: 'Found in the wild',
      when: '2022-03-15T08:00:00.000Z',
      where: 'Forest',
      kmFromTheCenter: 10,
      latitude: 47.6199,
      longitude: -122.3519,
      captureNeeded: false,
      whoBrought: '',
      whoCalled: '',
      arrivalWeight: 8,
      hadTreatment: true,
      isUnderVigilance: false,
      isInClinical: false,
      injuries: 'Broken leg',
      clinicalEvolution: 'Recovering well',
      necropsyDetails: '',
      status: 'Healthy'
    },

    {
      id: 2,
      givenName: 'Whiskers',
      commonName: 'Cat',
      scientificName: 'Felis catus',
      group: 'Mammal',
      estimatedDOB: '2022-03-15T08:00:00.000Z',
      ageAtAdmission: 4,
      sex: 'Male',
      placement: 'Adopted',
      otherDetails: 'Whiskers is a playful cat who loves to climb and purr. He was adopted by Jane Doe from the local animal shelter.',
      incomeReason: 'Found in the wild',
      when: '2022-03-15T08:00:00.000Z',
      where: 'Backyard',
      kmFromTheCenter: 5,
      latitude: 47.6199,
      longitude: -122.3519,
      captureNeeded: false,
      whoBrought: '',
      whoCalled: '',
      arrivalWeight: 3,
      hadTreatment: true,
      isUnderVigilance: false,
      isInClinical: false,
      injuries: 'Scratches',
      clinicalEvolution: 'Recovering well',
      necropsyDetails: '',
      status: 'Healthy'
    },
  ]);

  const [formData, setFormData] = useState<Animal>(emptyAnimal);

  const [editId, setEditId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState('list');
  const [currentStep, setCurrentStep] = useState(1);
  const [showCommonNameSuggestions, setShowCommonNameSuggestions] = useState(false);
  const [showScientificNameSuggestions, setShowScientificNameSuggestions] = useState(false);

  const steps = [
    { number: 1, title: 'Animal Details', description: 'Basic information' },
    { number: 2, title: 'Income Details', description: 'Reason for intake' },
    { number: 3, title: 'Clinical Information', description: 'Health records' },
    { number: 4, title: 'Status', description: 'Current status & notes' }
  ];

  const validateStep = (step: number) => {
    switch(step) {
      case 1:
        return formData.givenName && formData.commonName && formData.scientificName &&
            formData.group && formData.estimatedDOB && formData.ageAtAdmission && formData.sex;
      case 2:
        return formData.when && formData.incomeReason;
      case 3:
        return false // todo
      case 4:
        return formData.status;
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(currentStep + 1);
    } else {
      alert('Please fill in all required fields');
    }
  };

  const handleBack = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSubmit = () => {

    if (editId) {
      setAnimals(animals.map(a =>
          a.id === editId ? { ...formData, id: editId } satisfies Animal : a
      ));
      setEditId(null);
    } else {
      setAnimals([...animals, { ...formData, id: Date.now() } satisfies Animal]);
    }

    setFormData(emptyAnimal);
    setCurrentStep(1);
    setCurrentPage('list');
  };

  const handleEdit = (animal: any) => {
    setFormData(animal);
    setEditId(animal.id);
    setCurrentStep(1);
    setCurrentPage('form');
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this animal?')) {
      setAnimals(animals.filter(a => a.id !== id));
    }
  };

  const handleCancel = () => {
    setFormData(emptyAnimal);
    setEditId(null);
    setCurrentStep(1);
    setCurrentPage('list');
  };

  const handleAddNew = () => {
    setFormData(emptyAnimal);
    setEditId(null);
    setCurrentStep(1);
    setCurrentPage('form');
  };

  const filteredAnimals = animals.filter(a =>
      a.givenName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.commonName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.scientificName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Healthy': return 'bg-green-100 text-green-800';
      case 'Under Care': return 'bg-yellow-100 text-yellow-800';
      case 'Critical': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getUniqueCommonNames = () => {
    const uniqueNames = [...new Set(animals.map(a => a.commonName))];
    return uniqueNames.filter(name =>
        name.toLowerCase().includes(formData.commonName.toLowerCase())
    );
  };

  const getUniqueScientificNames = () => {
    const uniqueNames = [...new Set(animals.map(a => a.scientificName))];
    return uniqueNames.filter(name =>
        name.toLowerCase().includes(formData.scientificName.toLowerCase())
    );
  };

  const handleCommonNameSelect = (name: string) => {
    setFormData({...formData, commonName: name});
    setShowCommonNameSuggestions(false);
  };

  const handleScientificNameSelect = (name: string) => {
    setFormData({...formData, scientificName: name});
    setShowScientificNameSuggestions(false);
  };

  if (currentPage === 'form') {
    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-6">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="flex items-center gap-4 mb-6">
                <button
                    onClick={handleCancel}
                    className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition"
                >
                  <ArrowLeft className="w-5 h-5" />
                  Back to List
                </button>
              </div>

              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                {editId ? 'Edit Animal' : 'Add New Animal'}
              </h1>
              <p className="text-gray-600 mb-8">
                Step {currentStep} of {steps.length}: {steps[currentStep - 1].title}
              </p>

              {/* Progress Bar */}
              <div className="mb-8">
                <div className="flex justify-between mb-2">
                  {steps.map((step) => (
                      <div key={step.number} className="flex flex-col items-center flex-1">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold mb-2 ${
                            currentStep > step.number
                                ? 'bg-green-600 text-white'
                                : currentStep === step.number
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-gray-200 text-gray-600'
                        }`}>
                          {currentStep > step.number ? <Check className="w-5 h-5" /> : step.number}
                        </div>
                        <p className="text-xs text-center font-medium">{step.title}</p>
                      </div>
                  ))}
                </div>
                <div className="relative h-2 bg-gray-200 rounded-full">
                  <div
                      className="absolute h-2 bg-blue-600 rounded-full transition-all duration-300"
                      style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
                  />
                </div>
              </div>

              {/* Step 1: Animal Details */}
              {currentStep === 1 && (
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Given Name *
                      </label>
                      <input
                          type="text"
                          placeholder="e.g., Leo, Bella, Charlie"
                          value={formData.givenName}
                          onChange={(e) => setFormData({...formData, givenName: e.target.value})}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="relative">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Common Name *
                        </label>
                        <input
                            type="text"
                            placeholder="e.g., Lion, Elephant, Tiger"
                            value={formData.commonName}
                            onChange={(e) => {
                              setFormData({...formData, commonName: e.target.value});
                              setShowCommonNameSuggestions(true);
                            }}
                            onFocus={() => setShowCommonNameSuggestions(true)}
                            onBlur={() => setTimeout(() => setShowCommonNameSuggestions(false), 200)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
                        />
                        {showCommonNameSuggestions && formData.commonName && getUniqueCommonNames().length > 0 && (
                            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                              {getUniqueCommonNames().map((name, index) => (
                                  <div
                                      key={index}
                                      onClick={() => handleCommonNameSelect(name)}
                                      className="px-4 py-2 hover:bg-blue-50 cursor-pointer text-gray-800"
                                  >
                                    {name}
                                  </div>
                              ))}
                            </div>
                        )}
                      </div>

                      <div className="relative">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Scientific Name *
                        </label>
                        <input
                            type="text"
                            placeholder="e.g., Panthera leo"
                            value={formData.scientificName}
                            onChange={(e) => {
                              setFormData({...formData, scientificName: e.target.value});
                              setShowScientificNameSuggestions(true);
                            }}
                            onFocus={() => setShowScientificNameSuggestions(true)}
                            onBlur={() => setTimeout(() => setShowScientificNameSuggestions(false), 200)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
                        />
                        {showScientificNameSuggestions && formData.scientificName && getUniqueScientificNames().length > 0 && (
                            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                              {getUniqueScientificNames().map((name, index) => (
                                  <div
                                      key={index}
                                      onClick={() => handleScientificNameSelect(name)}
                                      className="px-4 py-2 hover:bg-blue-50 cursor-pointer text-gray-800 italic"
                                  >
                                    {name}
                                  </div>
                              ))}
                            </div>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Group *
                      </label>
                      <select
                          value={formData.group}
                          onChange={(e) => setFormData({...formData, group: e.target.value})}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
                      >
                        <option value="">Select group</option>
                        <option value="Mammal">Mammal</option>
                        <option value="Bird">Bird</option>
                        <option value="Reptile">Reptile</option>
                        <option value="Amphibian">Amphibian</option>
                        <option value="Fish">Fish</option>
                        <option value="Invertebrate">Invertebrate</option>
                      </select>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Estimated Date of Birth *
                        </label>
                        <input
                            type="date"
                            value={formData.estimatedDOB}
                            onChange={(e) => setFormData({...formData, estimatedDOB: e.target.value})}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Age at Admission *
                        </label>
                        <input
                            type="number"
                            step="0.1"
                            placeholder="e.g., 2.5"
                            value={formData.ageAtAdmission}
                          onChange={(e) => setFormData({...formData, ageAtAdmission: +e.target.value})}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Sex *
                        </label>
                        <select
                            value={formData.sex}
                            onChange={(e) => setFormData({...formData, sex: e.target.value})}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
                        >
                          <option value="">Select sex</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Unknown">Unknown</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Microchip Number
                        </label>
                        <input
                            type="text"
                            placeholder="e.g., MC123456789"
                            value={formData.microchipNumber}
                            onChange={(e) => setFormData({...formData, microchipNumber: e.target.value})}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Placement
                      </label>
                      <input
                          type="text"
                          placeholder="e.g., Enclosure A, Section 3"
                          value={formData.placement || ""}
                          onChange={(e) => setFormData({...formData, placement: e.target.value})}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Other Details
                      </label>
                      <textarea
                          placeholder="Any additional details about the animal..."
                          value={formData.otherDetails || ""}
                          onChange={(e) => setFormData({...formData, otherDetails: e.target.value})}
                          rows={3}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
                      />
                    </div>
                  </div>
              )}

              {/* Step 2: Income Details */}
              {currentStep === 2 && (
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        When Filed *
                      </label>
                      <input
                          type="date"
                          value={formData.when}
                          onChange={(e) => setFormData({...formData, when: e.target.value})}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Income Reason *
                      </label>
                      <textarea
                          placeholder="Describe the reason for intake (e.g., Orphaned, Injured, Abandoned, Transfer from another facility, Confiscated, etc.)"
                          value={formData.incomeReason}
                          onChange={(e) => setFormData({...formData, incomeReason: e.target.value})}
                          rows={6}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
                      />
                      <p className="text-sm text-gray-500 mt-2">
                        Please provide details about how and why this animal came into your care
                      </p>
                    </div>
                  </div>
              )}

              {/* Step 3: Clinical Information */}
              {currentStep === 3 && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/*<div>*/}
                      {/*  <label className="block text-sm font-semibold text-gray-700 mb-2">*/}
                      {/*    Weight (kg) **/}
                      {/*  </label>*/}
                      {/*  <input*/}
                      {/*      type="number"*/}
                      {/*      step="0.1"*/}
                      {/*      placeholder="e.g., 190"*/}
                      {/*      value={formData.weight}*/}
                      {/*      onChange={(e) => setFormData({...formData, weight: e.target.value})}*/}
                      {/*      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"*/}
                      {/*  />*/}
                      {/*</div>*/}

                      {/*<div>*/}
                      {/*  <label className="block text-sm font-semibold text-gray-700 mb-2">*/}
                      {/*    Temperature (°C) **/}
                      {/*  </label>*/}
                      {/*  <input*/}
                      {/*      type="number"*/}
                      {/*      step="0.1"*/}
                      {/*      placeholder="e.g., 38.5"*/}
                      {/*      value={formData.temperature}*/}
                      {/*      onChange={(e) => setFormData({...formData, temperature: e.target.value})}*/}
                      {/*      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"*/}
                      {/*  />*/}
                      {/*</div>*/}
                    </div>

                    {/*<div>*/}
                    {/*  <label className="block text-sm font-semibold text-gray-700 mb-2">*/}
                    {/*    Blood Type **/}
                    {/*  </label>*/}
                    {/*  <input*/}
                    {/*      type="text"*/}
                    {/*      placeholder="e.g., A, B, AB, O"*/}
                    {/*      value={formData.bloodType}*/}
                    {/*      onChange={(e) => setFormData({...formData, bloodType: e.target.value})}*/}
                    {/*      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"*/}
                    {/*  />*/}
                    {/*</div>*/}

                  </div>
              )}

              {/* Step 4: Status */}
              {currentStep === 4 && (
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Health Status *
                      </label>
                      <select
                          value={formData.status}
                          onChange={(e) => setFormData({...formData, status: e.target.value})}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
                      >
                        <option value="Healthy">Healthy</option>
                        <option value="Under Care">Under Care</option>
                        <option value="Critical">Critical</option>
                      </select>
                    </div>

                    {/*<div>*/}
                    {/*  <label className="block text-sm font-semibold text-gray-700 mb-2">*/}
                    {/*    Additional Notes*/}
                    {/*  </label>*/}
                    {/*  <textarea*/}
                    {/*      placeholder="Any additional information about the animal..."*/}
                    {/*      value={formData.notes}*/}
                    {/*      onChange={(e) => setFormData({...formData, notes: e.target.value})}*/}
                    {/*      rows={6}*/}
                    {/*      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"*/}
                    {/*  />*/}
                    {/*</div>*/}

                    {/* Summary */}
                    <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                      <h3 className="font-semibold text-lg mb-4 text-blue-900">Summary</h3>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-gray-600">Given Name:</p>
                          <p className="font-semibold">{formData.givenName}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Common Name:</p>
                          <p className="font-semibold">{formData.commonName}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Scientific Name:</p>
                          <p className="font-semibold">{formData.scientificName}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Group:</p>
                          <p className="font-semibold">{formData.group}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Age at Admission:</p>
                          <p className="font-semibold">{formData.ageAtAdmission}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Sex:</p>
                          <p className="font-semibold">{formData.sex}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">When:</p>
                          <p className="font-semibold">{formData.when}</p>
                        </div>
                        <div className="col-span-2">
                          <p className="text-gray-600">Income Reason:</p>
                          <p className="font-semibold">{formData.incomeReason}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Status:</p>
                          <p className="font-semibold">{formData.status}</p>
                        </div>
                      </div>
                    </div>
                  </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between gap-4 mt-8 pt-6 border-t border-gray-200">
                <button
                    onClick={handleCancel}
                    className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition text-lg font-semibold"
                >
                  Cancel
                </button>

                <div className="flex gap-3">
                  {currentStep > 1 && (
                      <button
                          onClick={handleBack}
                          className="flex items-center gap-2 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition text-lg font-semibold"
                      >
                        <ArrowLeft className="w-5 h-5" />
                        Back
                      </button>
                  )}

                  {currentStep < steps.length ? (
                      <button
                          onClick={handleNext}
                          className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-lg font-semibold"
                      >
                        Next
                        <ArrowRight className="w-5 h-5" />
                      </button>
                  ) : (
                      <button
                          onClick={handleSubmit}
                          className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition text-lg font-semibold"
                      >
                        <Check className="w-5 h-5" />
                        {editId ? 'Update Animal' : 'Save Animal'}
                      </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
    );
  }

  return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Animal Management System</h1>
            <p className="text-gray-600">Track and manage your animal collection</p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <div className="flex gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                <input
                    type="text"
                    placeholder="Search by name, common name, or scientific name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <button
                  onClick={handleAddNew}
                  className="flex items-center gap-2 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
              >
                <Plus className="w-5 h-5" />
                Add Animal
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredAnimals.map(animal => (
                  <div key={animal.id} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-xl font-bold text-gray-800">{animal.givenName}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(animal.status)}`}>
                    {animal.status}
                  </span>
                    </div>
                    <div className="space-y-2 mb-4">
                      <p className="text-gray-600"><span className="font-semibold">Common Name:</span> {animal.commonName}</p>
                      <p className="text-gray-600 text-sm italic">{animal.scientificName}</p>
                      <p className="text-gray-600"><span className="font-semibold">Group:</span> {animal.group}</p>
                      <p className="text-gray-600"><span className="font-semibold">Sex:</span> {animal.sex}</p>
                      <p className="text-gray-600"><span className="font-semibold">Age at Admission:</span> {animal.ageAtAdmission}</p>
                      {animal.placement && <p className="text-gray-600"><span className="font-semibold">Placement:</span> {animal.placement}</p>}
                    </div>
                    <div className="flex gap-2">
                      <button
                          onClick={() => handleEdit(animal)}
                          className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                      >
                        <Edit2 className="w-4 h-4" />
                        Edit
                      </button>
                      <button
                          onClick={() => handleDelete(animal.id)}
                          className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
                      >
                        <Trash2 className="w-4 h-4" />
                        Delete
                      </button>
                    </div>
                  </div>
              ))}
            </div>

            {filteredAnimals.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                  <p className="text-lg">No animals found</p>
                  <p className="text-sm">Try adjusting your search or add a new animal</p>
                </div>
            )}
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-3">Statistics</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-2xl font-bold text-blue-600">{animals.length}</p>
                <p className="text-sm text-gray-600">Total Animals</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <p className="text-2xl font-bold text-green-600">
                  {animals.filter(a => a.status === 'Healthy').length}
                </p>
                <p className="text-sm text-gray-600">Healthy</p>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg">
                <p className="text-2xl font-bold text-yellow-600">
                  {animals.filter(a => a.status === 'Under Care').length}
                </p>
                <p className="text-sm text-gray-600">Under Care</p>
              </div>
              <div className="bg-red-50 p-4 rounded-lg">
                <p className="text-2xl font-bold text-red-600">
                  {animals.filter(a => a.status === 'Critical').length}
                </p>
                <p className="text-sm text-gray-600">Critical</p>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}