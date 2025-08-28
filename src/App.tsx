import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Users, TrendingUp, Package, Leaf, ChevronRight } from 'lucide-react';

// Import the actual survey data
import surveyData from './data/survey data.json';

interface SurveyResponse {
  "What is your gender?": string;
  "What is your age group?": string;
  "What is your highest educational qualification?": string;
  "What is your occupation?": string;
  "What is your monthly income?": string;
  "Brand Preference": string;
  "Brand Purchase Frequency": string;
  "Brand Purchase Factor": string;
  "Recent Brand Switch": string;
  "Brand Switch Frequency": string;
  "Brand Switch Factor": string;
  "Packaging Influence on Purchase": string;
  "Important Packaging Factors": string;
  "Key Visual Factor": string;
  "Compares by Packaging": string;
  "Essential Information": string;
  "Eco-Preference": string;
  "Eco-Availability Perception": string;
  "Reasons for Eco-Preference": string;
  "Usage Frequency (Home Care)": string;
  "Usage Frequency (Personal Care)": string;
  "Usage Frequency (Food & Bev)": string;
  "Usage Frequency (Alcohol/Cigarettes)": string;
  "Usage Frequency (OTC Meds)": string;
}

const COLORS = ['#3B82F6', '#EF4444', '#10B981', '#F59E0B', '#8B5CF6', '#EC4899'];

function App() {
  const [activeTab, setActiveTab] = useState('overview');
  
  // Process survey data
  const responses = surveyData as SurveyResponse[];
  const totalResponses = responses.length;

  // Gender distribution
  const genderData = responses.reduce((acc, response) => {
    const gender = response["What is your gender?"].toLowerCase() === 'male' ? 'Male' : 'Female';
    acc[gender] = (acc[gender] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const genderChartData = Object.entries(genderData).map(([gender, count]) => ({
    name: gender,
    value: count,
    percentage: Math.round((count / totalResponses) * 100)
  }));

  // Age distribution
  const ageData = responses.reduce((acc, response) => {
    const age = response["What is your age group?"];
    acc[age] = (acc[age] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const ageChartData = Object.entries(ageData).map(([age, count]) => ({
    name: age,
    count,
    percentage: Math.round((count / totalResponses) * 100)
  }));

  // Brand preference
  const brandPrefData = responses.reduce((acc, response) => {
    const pref = response["Brand Preference"];
    acc[pref] = (acc[pref] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const brandPrefChartData = Object.entries(brandPrefData).map(([pref, count]) => ({
    name: pref,
    value: count,
    percentage: Math.round((count / totalResponses) * 100)
  }));

  // Packaging influence
  const packagingData = responses.reduce((acc, response) => {
    const influence = response["Packaging Influence on Purchase"];
    acc[influence] = (acc[influence] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const packagingChartData = Object.entries(packagingData).map(([influence, count]) => ({
    name: influence,
    count,
    percentage: Math.round((count / totalResponses) * 100)
  }));

  // Eco preference
  const ecoData = responses.reduce((acc, response) => {
    const eco = response["Eco-Preference"];
    acc[eco] = (acc[eco] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const ecoChartData = Object.entries(ecoData).map(([eco, count]) => ({
    name: eco,
    value: count,
    percentage: Math.round((count / totalResponses) * 100)
  }));

  const MetricCard = ({ title, value, subtitle, icon: Icon, color }: {
    title: string;
    value: string;
    subtitle: string;
    icon: any;
    color: string;
  }) => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
          <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
        </div>
        <div className={`p-3 rounded-lg ${color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
  );

  const TabButton = ({ id, label, isActive, onClick }: {
    id: string;
    label: string;
    isActive: boolean;
    onClick: () => void;
  }) => (
    <button
      onClick={onClick}
      className={`px-6 py-3 rounded-lg font-medium transition-all ${
        isActive
          ? 'bg-blue-600 text-white shadow-md'
          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Consumer Behavior Survey</h1>
                <p className="text-gray-600 mt-2">Brand Preference & Packaging Influence Analysis</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">Total Responses</p>
                <p className="text-2xl font-bold text-blue-600">{totalResponses}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex space-x-2 bg-white rounded-lg p-2 shadow-sm border border-gray-200">
          <TabButton
            id="overview"
            label="Overview"
            isActive={activeTab === 'overview'}
            onClick={() => setActiveTab('overview')}
          />
          <TabButton
            id="demographics"
            label="Demographics"
            isActive={activeTab === 'demographics'}
            onClick={() => setActiveTab('demographics')}
          />
          <TabButton
            id="brand-behavior"
            label="Brand Behavior"
            isActive={activeTab === 'brand-behavior'}
            onClick={() => setActiveTab('brand-behavior')}
          />
          <TabButton
            id="packaging"
            label="Packaging Impact"
            isActive={activeTab === 'packaging'}
            onClick={() => setActiveTab('packaging')}
          />
          <TabButton
            id="sustainability"
            label="Sustainability"
            isActive={activeTab === 'sustainability'}
            onClick={() => setActiveTab('sustainability')}
          />
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <MetricCard
                title="Total Responses"
                value={totalResponses.toString()}
                subtitle="Survey participants"
                icon={Users}
                color="bg-blue-600"
              />
              <MetricCard
                title="Brand Preference"
                value={`${Math.round((brandPrefData['Yes'] / totalResponses) * 100)}%`}
                subtitle="Prefer branded products"
                icon={TrendingUp}
                color="bg-green-600"
              />
              <MetricCard
                title="Packaging Influence"
                value={`${Math.round(((packagingData['Agree'] || 0) + (packagingData['Strongly agree'] || 0)) / totalResponses * 100)}%`}
                subtitle="Influenced by packaging"
                icon={Package}
                color="bg-purple-600"
              />
              <MetricCard
                title="Eco-Conscious"
                value={`${Math.round(((ecoData['Agree'] || 0) + (ecoData['Strongly agree'] || 0)) / totalResponses * 100)}%`}
                subtitle="Prefer eco-friendly"
                icon={Leaf}
                color="bg-emerald-600"
              />
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Gender Distribution</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={genderChartData}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percentage }) => `${name}: ${percentage}%`}
                    >
                      {genderChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Age Group Distribution</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={ageChartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="#3B82F6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'demographics' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Age Groups</h3>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={ageChartData} layout="horizontal">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="name" type="category" width={120} />
                    <Tooltip />
                    <Bar dataKey="count" fill="#10B981" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Gender Split</h3>
                <ResponsiveContainer width="100%" height={400}>
                  <PieChart>
                    <Pie
                      data={genderChartData}
                      cx="50%"
                      cy="50%"
                      outerRadius={120}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percentage }) => `${name}: ${percentage}%`}
                    >
                      {genderChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'brand-behavior' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Brand Preference</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={brandPrefChartData}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percentage }) => `${name}: ${percentage}%`}
                    >
                      {brandPrefChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Insights</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                    <div>
                      <p className="font-medium text-blue-900">Brand Loyalty</p>
                      <p className="text-sm text-blue-700">High preference for branded products</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                    <div>
                      <p className="font-medium text-green-900">Price Sensitivity</p>
                      <p className="text-sm text-green-700">Price is a major switching factor</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-green-600" />
                  </div>
                  <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
                    <div>
                      <p className="font-medium text-purple-900">Quality Focus</p>
                      <p className="text-sm text-purple-700">Quality drives purchase decisions</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-purple-600" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'packaging' && (
          <div className="space-y-8">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Packaging Influence on Purchase Decisions</h3>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={packagingChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#F59E0B" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {activeTab === 'sustainability' && (
          <div className="space-y-8">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Eco-Friendly Preferences</h3>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={ecoChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#10B981" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;