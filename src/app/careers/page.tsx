'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { motion } from 'framer-motion'
import MouseFollowGradient from '@/components/MouseFollowGradient'
import { supabase } from '@/lib/supabase'
import { formatPhoneNumber, validateEmail, validatePhone } from '@/utils/formatters'

export default function CareersPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    experience: '',
    position: '',
    references: [{
      name: '',
      relationship: '',
      phone: '',
      email: ''
    }]
  })
  const [formErrors, setFormErrors] = useState({
    email: '',
    phone: '',
    references: [{ email: '', phone: '' }]
  })
  const [resume, setResume] = useState<File | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null
    message: string
  }>({ type: null, message: '' })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    
    if (name === 'phone') {
      const formattedPhone = formatPhoneNumber(value)
      setFormData(prev => ({
        ...prev,
        [name]: formattedPhone
      }))
      setFormErrors(prev => ({
        ...prev,
        phone: validatePhone(formattedPhone) ? '' : 'Please enter a valid 10-digit phone number'
      }))
    } else if (name === 'email') {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }))
      setFormErrors(prev => ({
        ...prev,
        email: validateEmail(value) ? '' : 'Please enter a valid email address'
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }))
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      if (file.size > 10 * 1024 * 1024) { // 10MB limit
        setSubmitStatus({
          type: 'error',
          message: 'Resume file size must be less than 10MB'
        })
        return
      }
      setResume(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus({ type: null, message: '' })

    try {
      // Upload resume to Supabase Storage if present
      let resumeUrl = ''
      if (resume) {
        const fileExt = resume.name.split('.').pop()
        const fileName = `${Date.now()}-${formData.firstName}-${formData.lastName}.${fileExt}`
        
        const { data: uploadData, error: uploadError } = await supabase
          .storage
          .from('resumes')
          .upload(fileName, resume)

        if (uploadError) {
          console.error('Resume upload error:', uploadError)
          throw uploadError
        }
        
        resumeUrl = uploadData.path
      }

      // Save application data to Supabase
      const { data: applicationData, error: insertError } = await supabase
        .from('job_applications')
        .insert({
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          years_experience: parseInt(formData.experience),
          position: formData.position,
          ...(resumeUrl && { resume_url: resumeUrl }),
          status: 'new'
        })
        .select()
        .single()

      if (insertError) {
        console.error('Application insert error:', insertError)
        throw insertError
      }

      if (!applicationData?.id) {
        throw new Error('No application ID returned')
      }

      // Save references
      const { error: referencesError } = await supabase
        .from('job_references')
        .insert(
          formData.references.map(ref => ({
            application_id: applicationData.id,
            name: ref.name,
            relationship: ref.relationship,
            phone: ref.phone,
            email: ref.email
          }))
        )

      if (referencesError) {
        console.error('References insert error:', referencesError)
        throw referencesError
      }

      // Redirect to success page
      router.push('/careers/success')

    } catch (error) {
      console.error('Error submitting application:', error)
      setSubmitStatus({
        type: 'error',
        message: 'There was an error submitting your application. Please try again.'
      })
      setIsSubmitting(false)
    }
  }

  const addReference = () => {
    setFormData(prev => ({
      ...prev,
      references: [...prev.references, { name: '', relationship: '', phone: '', email: '' }]
    }))
  }

  const removeReference = (index: number) => {
    setFormData(prev => ({
      ...prev,
      references: prev.references.filter((_, i) => i !== index)
    }))
  }

  const handleReferenceChange = (index: number, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      references: prev.references.map((ref, i) => {
        if (i === index) {
          if (field === 'phone') {
            return { ...ref, [field]: formatPhoneNumber(value) }
          }
          return { ...ref, [field]: value }
        }
        return ref
      })
    }))

    if (field === 'email' || field === 'phone') {
      setFormErrors(prev => ({
        ...prev,
        references: prev.references.map((ref, i) => {
          if (i === index) {
            if (field === 'email') {
              return { ...ref, email: validateEmail(value) ? '' : 'Please enter a valid email address' }
            }
            if (field === 'phone') {
              return { ...ref, phone: validatePhone(value) ? '' : 'Please enter a valid 10-digit phone number' }
            }
          }
          return ref
        })
      }))
    }
  }

  return (
    <main className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-16 relative overflow-hidden bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700">
        <MouseFollowGradient variant="dark" opacity={0.3} />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6"
            >
              <h1 className="text-5xl md:text-6xl font-display font-bold mb-4 bg-gradient-to-r from-blue-500 to-blue-700 bg-clip-text text-transparent">
                Join Our Team
              </h1>
              <div className="h-1 w-24 bg-blue-400 mx-auto rounded-full"></div>
            </motion.div>
            <motion.p 
              className="text-xl text-gray-900 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              Build your career with Taylor's Collision. We're looking for talented individuals who are passionate about auto body repair and customer service.
            </motion.p>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-b from-transparent to-gray-50"></div>
        <div className="absolute -bottom-px left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full">
            <path fill="#F9FAFB" fillOpacity="1" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>
      </section>

      {/* Application Form Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div 
              className="bg-white rounded-2xl shadow-xl p-8 backdrop-blur-sm bg-opacity-95"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-3xl font-semibold text-gray-900 mb-8 pb-4 border-b border-gray-200">
                Application Form
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Personal Information Section */}
                <div className="bg-gray-50 p-6 rounded-xl">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">Personal Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                        First Name
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        required
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      />
                    </div>

                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                        Last Name
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        required
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${
                          formErrors.email ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      {formErrors.email && (
                        <p className="mt-1 text-sm text-red-600">{formErrors.email}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${
                          formErrors.phone ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="(555) 555-5555"
                      />
                      {formErrors.phone && (
                        <p className="mt-1 text-sm text-red-600">{formErrors.phone}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Professional Information Section */}
                <div className="bg-gray-50 p-6 rounded-xl">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">Professional Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-2">
                        Years of Experience
                      </label>
                      <input
                        type="number"
                        id="experience"
                        name="experience"
                        required
                        min="0"
                        max="50"
                        value={formData.experience}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      />
                    </div>

                    <div>
                      <label htmlFor="position" className="block text-sm font-medium text-gray-700 mb-2">
                        Position
                      </label>
                      <select
                        id="position"
                        name="position"
                        required
                        value={formData.position}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      >
                        <option value="">Select a position</option>
                        <option value="Auto Body Technician">Auto Body Technician</option>
                        <option value="Painter">Painter</option>
                        <option value="Estimator">Estimator</option>
                        <option value="Customer Service">Customer Service</option>
                      </select>
                    </div>

                    <div className="col-span-2">
                      <label htmlFor="resume" className="block text-sm font-medium text-gray-700 mb-2">
                        Resume (PDF, DOC, DOCX - Max 10MB)
                      </label>
                      <input
                        type="file"
                        id="resume"
                        name="resume"
                        accept=".pdf,.doc,.docx"
                        onChange={handleFileChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      />
                    </div>
                  </div>
                </div>

                {/* References Section */}
                <div className="bg-gray-50 p-6 rounded-xl">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-semibold text-gray-800">References</h3>
                    <button
                      type="button"
                      onClick={addReference}
                      className="px-4 py-2 text-sm font-medium text-primary-600 hover:text-primary-700 bg-white rounded-lg border border-primary-600 hover:border-primary-700 transition-colors"
                    >
                      Add Reference
                    </button>
                  </div>
                  
                  {formData.references.map((reference, index) => (
                    <div key={index} className="mb-6 p-4 bg-white rounded-lg border border-gray-200">
                      <div className="flex justify-between items-center mb-4">
                        <h4 className="text-lg font-medium text-gray-700">Reference #{index + 1}</h4>
                        {index > 0 && (
                          <button
                            type="button"
                            onClick={() => removeReference(index)}
                            className="text-red-600 hover:text-red-700 text-sm"
                          >
                            Remove
                          </button>
                        )}
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Full Name
                          </label>
                          <input
                            type="text"
                            required
                            value={reference.name}
                            onChange={(e) => handleReferenceChange(index, 'name', e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Relationship
                          </label>
                          <input
                            type="text"
                            required
                            value={reference.relationship}
                            onChange={(e) => handleReferenceChange(index, 'relationship', e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Email Address
                          </label>
                          <input
                            type="email"
                            required
                            value={reference.email}
                            onChange={(e) => handleReferenceChange(index, 'email', e.target.value)}
                            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${
                              formErrors.references[index]?.email ? 'border-red-500' : 'border-gray-300'
                            }`}
                          />
                          {formErrors.references[index]?.email && (
                            <p className="mt-1 text-sm text-red-600">{formErrors.references[index].email}</p>
                          )}
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Phone Number
                          </label>
                          <input
                            type="tel"
                            required
                            value={reference.phone}
                            onChange={(e) => handleReferenceChange(index, 'phone', e.target.value)}
                            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${
                              formErrors.references[index]?.phone ? 'border-red-500' : 'border-gray-300'
                            }`}
                            placeholder="(555) 555-5555"
                          />
                          {formErrors.references[index]?.phone && (
                            <p className="mt-1 text-sm text-red-600">{formErrors.references[index].phone}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Submit Button */}
                <div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full px-6 py-4 text-white font-semibold rounded-lg transition-all duration-200 text-lg
                      ${isSubmitting 
                        ? 'bg-gray-400 cursor-not-allowed' 
                        : 'bg-primary-600 hover:bg-primary-700 active:bg-primary-800 transform hover:-translate-y-1'
                      }`}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Submitting...
                      </span>
                    ) : 'Submit Application'}
                  </button>
                </div>

                {/* Status Message */}
                {submitStatus.type && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-4 rounded-lg ${
                      submitStatus.type === 'success' 
                        ? 'bg-green-50 text-green-800 border border-green-200' 
                        : 'bg-red-50 text-red-800 border border-red-200'
                    }`}
                  >
                    <div className="flex items-center">
                      {submitStatus.type === 'success' ? (
                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                        </svg>
                      ) : (
                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"/>
                        </svg>
                      )}
                      {submitStatus.message}
                    </div>
                  </motion.div>
                )}
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
} 