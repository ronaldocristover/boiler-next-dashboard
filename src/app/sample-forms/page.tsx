"use client";

import { useState } from "react";
import { DateRangePicker } from "@/lib/date-range-picker";
import { WysiwygEditor } from "@/lib/wysiwyg-editor";

export default function SampleFormsPage() {
  const [formData, setFormData] = useState({
    // Text inputs
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
    website: "",

    // Selection inputs
    country: "",
    gender: "",
    subscription: "",

    // Checkboxes and toggles
    newsletter: false,
    terms: false,
    notifications: false,

    // Other inputs
    birthDate: "",
    message: "",
    rating: 5,
    fileUpload: null as File | null,
    color: "#000000",
    range: 50,

    // Advanced date/time inputs
    specificDate: "",
    dateTime: "",
    time: "",
    month: "",
    week: "",
    dateRange: {
      startDate: "",
      endDate: ""
    },

    // Rich text editor
    richTextContent: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else if (type === "file") {
      const file = (e.target as HTMLInputElement).files?.[0] || null;
      setFormData(prev => ({ ...prev, [name]: file }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleDateRangeChange = (range: { startDate: string; endDate: string }) => {
    setFormData(prev => ({ ...prev, dateRange: range }));
  };

  const handleRichTextChange = (content: string) => {
    setFormData(prev => ({ ...prev, richTextContent: content }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Form submitted! Check console for data.");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Sample Input Forms</h1>
        <p className="text-sm text-muted-foreground mt-1">A comprehensive collection of all common form input types</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Text Inputs Section */}
        <div className="rounded-lg border bg-card text-card-foreground p-6">
          <h2 className="text-base font-semibold mb-4">Text Inputs</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium mb-2">
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-ring bg-background"
                  placeholder="Enter your first name"
                />
              </div>

              <div>
                <label htmlFor="lastName" className="block text-sm font-medium mb-2">
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-ring bg-background"
                  placeholder="Enter your last name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-ring bg-background"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium mb-2">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-ring bg-background"
                  placeholder="Enter your password"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-ring bg-background"
                  placeholder="Enter your phone number"
                />
              </div>

              <div>
                <label htmlFor="website" className="block text-sm font-medium mb-2">
                  Website URL
                </label>
                <input
                  type="url"
                  id="website"
                  name="website"
                  value={formData.website}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-ring bg-background"
                  placeholder="https://example.com"
                />
              </div>
            </div>
          </div>

        {/* Selection Inputs Section */}
        <div className="rounded-lg border bg-card text-card-foreground p-6">
          <h2 className="text-base font-semibold mb-4">Selection Inputs</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label htmlFor="country" className="block text-sm font-medium mb-2">
                  Country
                </label>
                <select
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-ring bg-background"
                >
                  <option value="">Select a country</option>
                  <option value="us">United States</option>
                  <option value="ca">Canada</option>
                  <option value="uk">United Kingdom</option>
                  <option value="au">Australia</option>
                  <option value="de">Germany</option>
                  <option value="fr">France</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Gender</label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="gender"
                      value="male"
                      checked={formData.gender === "male"}
                      onChange={handleInputChange}
                      className="mr-2"
                    />
                    Male
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="gender"
                      value="female"
                      checked={formData.gender === "female"}
                      onChange={handleInputChange}
                      className="mr-2"
                    />
                    Female
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="gender"
                      value="other"
                      checked={formData.gender === "other"}
                      onChange={handleInputChange}
                      className="mr-2"
                    />
                    Other
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Subscription</label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="subscription"
                      value="free"
                      checked={formData.subscription === "free"}
                      onChange={handleInputChange}
                      className="mr-2"
                    />
                    Free
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="subscription"
                      value="premium"
                      checked={formData.subscription === "premium"}
                      onChange={handleInputChange}
                      className="mr-2"
                    />
                    Premium
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="subscription"
                      value="enterprise"
                      checked={formData.subscription === "enterprise"}
                      onChange={handleInputChange}
                      className="mr-2"
                    />
                    Enterprise
                  </label>
                </div>
              </div>
            </div>
          </div>

        {/* Checkboxes and Toggles Section */}
        <div className="rounded-lg border bg-card text-card-foreground p-6">
          <h2 className="text-base font-semibold mb-4">Checkboxes & Toggles</h2>
            <div className="space-y-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="newsletter"
                  checked={formData.newsletter}
                  onChange={handleInputChange}
                  className="mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <span className="text-sm">Subscribe to newsletter</span>
              </label>

              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="terms"
                  checked={formData.terms}
                  onChange={handleInputChange}
                  className="mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <span className="text-sm">I agree to the terms and conditions</span>
              </label>

              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="notifications"
                  checked={formData.notifications}
                  onChange={handleInputChange}
                  className="mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <span className="text-sm">Enable push notifications</span>
              </label>
            </div>
          </div>

        {/* Date, File, and Specialized Inputs Section */}
        <div className="rounded-lg border bg-card text-card-foreground p-6">
          <h2 className="text-base font-semibold mb-4">Specialized Inputs</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="birthDate" className="block text-sm font-medium mb-2">
                  Birth Date
                </label>
                <input
                  type="date"
                  id="birthDate"
                  name="birthDate"
                  value={formData.birthDate}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-ring bg-background"
                />
              </div>

              <div>
                <label htmlFor="rating" className="block text-sm font-medium mb-2">
                  Rating (1-10): {formData.rating}
                </label>
                <input
                  type="range"
                  id="rating"
                  name="rating"
                  min="1"
                  max="10"
                  value={formData.rating}
                  onChange={handleInputChange}
                  className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer"
                />
              </div>

              <div>
                <label htmlFor="color" className="block text-sm font-medium mb-2">
                  Favorite Color
                </label>
                <input
                  type="color"
                  id="color"
                  name="color"
                  value={formData.color}
                  onChange={handleInputChange}
                  className="w-full h-10 border rounded-md cursor-pointer"
                />
              </div>

              <div>
                <label htmlFor="range" className="block text-sm font-medium mb-2">
                  Range (0-100): {formData.range}
                </label>
                <input
                  type="range"
                  id="range"
                  name="range"
                  min="0"
                  max="100"
                  value={formData.range}
                  onChange={handleInputChange}
                  className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer"
                />
              </div>

              <div className="md:col-span-2">
                <label htmlFor="fileUpload" className="block text-sm font-medium mb-2">
                  File Upload
                </label>
                <input
                  type="file"
                  id="fileUpload"
                  name="fileUpload"
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-ring bg-background"
                />
              </div>
            </div>
          </div>

        {/* Text Area Section */}
        <div className="rounded-lg border bg-card text-card-foreground p-6">
          <h2 className="text-base font-semibold mb-4">Text Area</h2>
            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                value={formData.message}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-ring bg-background"
                placeholder="Enter your message here..."
              />
            </div>
          </div>

        {/* Advanced Date & Time Inputs Section */}
        <div className="rounded-lg border bg-card text-card-foreground p-6">
          <h2 className="text-base font-semibold mb-4">Advanced Date & Time Inputs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <label htmlFor="specificDate" className="block text-sm font-medium mb-2">
                Specific Date
              </label>
              <input
                type="date"
                id="specificDate"
                name="specificDate"
                value={formData.specificDate}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-ring bg-background"
              />
            </div>

            <div>
              <label htmlFor="dateTime" className="block text-sm font-medium mb-2">
                Date & Time
              </label>
              <input
                type="datetime-local"
                id="dateTime"
                name="dateTime"
                value={formData.dateTime}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-ring bg-background"
              />
            </div>

            <div>
              <label htmlFor="time" className="block text-sm font-medium mb-2">
                Time Only
              </label>
              <input
                type="time"
                id="time"
                name="time"
                value={formData.time}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-ring bg-background"
              />
            </div>

            <div>
              <label htmlFor="month" className="block text-sm font-medium mb-2">
                Month & Year
              </label>
              <input
                type="month"
                id="month"
                name="month"
                value={formData.month}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-ring bg-background"
              />
            </div>

            <div>
              <label htmlFor="week" className="block text-sm font-medium mb-2">
                Week of Year
              </label>
              <input
                type="week"
                id="week"
                name="week"
                value={formData.week}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-ring bg-background"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Date Range
              </label>
              <DateRangePicker
                value={formData.dateRange}
                onChange={handleDateRangeChange}
              />
            </div>
          </div>
        </div>

        {/* WYSIWYG Rich Text Editor Section */}
        <div className="rounded-lg border bg-card text-card-foreground p-6">
          <h2 className="text-base font-semibold mb-4">Rich Text Editor (WYSIWYG)</h2>
          <div>
            <label className="block text-sm font-medium mb-2">
              Rich Text Content
            </label>
            <WysiwygEditor
              value={formData.richTextContent}
              onChange={handleRichTextChange}
              placeholder="Start typing your rich text content here..."
              className="w-full"
            />
            {formData.richTextContent && (
              <div className="mt-4">
                <h4 className="text-sm font-medium mb-2">HTML Output Preview:</h4>
                <div className="p-3 bg-muted rounded-md text-xs overflow-auto max-h-32">
                  <code>{formData.richTextContent}</code>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-3 px-8 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          >
            Submit Form
          </button>
        </div>
      </form>
    </div>
  );
}