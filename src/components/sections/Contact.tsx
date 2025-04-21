'use client'

import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  Send,
  CheckCircle,
  XCircle,
  Github,
  Linkedin,
  Mail,
  Clock,
  ExternalLink,
  AlertCircle,
} from 'lucide-react'
import TypingText from '@/components/ui/TypingText'

type FormErrors = {
  name?: string
  email?: string
  message?: string
  emailType?: string
}

export default function Contact() {
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [formMessage, setFormMessage] = useState('')
  const [errors, setErrors] = useState<FormErrors>({})
  const [selectedEmailType, setSelectedEmailType] = useState('professional')
  const formRef = useRef<HTMLFormElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // Auto-resize textarea on input
  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current
    if (textarea) {
      textarea.style.height = 'auto'
      textarea.style.height = `${textarea.scrollHeight}px`
    }
  }

  // Initialize textarea height
  useEffect(() => {
    adjustTextareaHeight()
  }, [])

  // Reset form status after a delay when success
  useEffect(() => {
    if (formStatus === 'success') {
      const timer = setTimeout(() => {
        setFormStatus('idle')
        setFormMessage('')
      }, 6000)
      return () => clearTimeout(timer)
    }
  }, [formStatus])

  const socialLinks = [
    {
      name: 'GitHub',
      icon: Github,
      href: 'https://github.com/KristiyanCholakov',
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      href: 'https://linkedin.com/in/kristiyan-cholakov',
    },
  ]

  const emailTypes = [
    {
      id: 'professional',
      type: 'Professional',
      description: 'For business inquiries and professional opportunities',
    },
    {
      id: 'personal',
      type: 'Personal',
      description: 'For personal matters and general conversations',
    },
    {
      id: 'educational',
      type: 'Educational',
      description: 'For academic and educational-related communications',
    },
  ]

  const validateForm = (data: {
    name: string
    email: string
    message: string
    emailType: string
  }): FormErrors => {
    const errors: FormErrors = {}

    if (!data.name.trim()) {
      errors.name = 'Name is required'
    }

    if (!data.email.trim()) {
      errors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      errors.email = 'Email is not valid'
    }

    if (!data.message.trim()) {
      errors.message = 'Message is required'
    }

    if (!data.emailType) {
      errors.emailType = 'Please select a recipient'
    }

    return errors
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrors({})

    // Get form data
    const formData = new FormData(e.target as HTMLFormElement)
    const formValues = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      message: formData.get('message') as string,
      emailType: selectedEmailType,
    }

    // Client-side validation
    const validationErrors = validateForm(formValues)
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    setFormStatus('loading')

    try {
      // Send the form data to the API endpoint
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formValues),
      })

      const data = await response.json()

      if (response.ok && data.success) {
        setFormStatus('success')
        setFormMessage("Message sent successfully! I'll get back to you soon.")
        if (formRef.current) formRef.current.reset()

        // Reset textarea height
        if (textareaRef.current) {
          textareaRef.current.style.height = 'auto'
        }
      } else {
        setFormStatus('error')

        if (data.details) {
          // Handle validation errors from server
          setErrors(data.details)
          setFormMessage('Please correct the errors in the form.')
        } else {
          setFormMessage(
            data.error || 'Something went wrong. Please try again or contact me directly via email.'
          )
        }
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      setFormStatus('error')
      setFormMessage('Failed to send message. Please try again or contact me directly via email.')
    }
  }

  return (
    <section id="contact" className="relative py-16 sm:py-24">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10 opacity-30">
        <div
          className="h-full w-full"
          style={{
            backgroundImage:
              'radial-gradient(circle at 80% 50%, rgba(56,189,248,0.20), transparent 60%)',
            backgroundSize: '100% 100%',
          }}
        />
        <div className="absolute inset-0 opacity-20">
          <div
            className="h-full w-full"
            style={{
              backgroundImage: `
              repeating-linear-gradient(90deg, rgba(56,189,248,0.3) 0px, rgba(56,189,248,0.3) 2px, transparent 2px, transparent 60px),
              repeating-linear-gradient(0deg, rgba(56,189,248,0.3) 0px, rgba(56,189,248,0.3) 2px, transparent 2px, transparent 60px)
            `,
              backgroundSize: '60px 60px',
            }}
          />
        </div>
      </div>

      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 flex flex-col items-center"
        >
          <motion.h2 className="text-accent mb-2 text-3xl font-bold sm:text-4xl">Contact</motion.h2>
          <motion.div
            initial={{ width: '0%' }}
            whileInView={{ width: '80px' }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="bg-accent mb-6 h-1"
          />
        </motion.div>

        {/* Split container */}
        <div className="from-surface/5 relative rounded-3xl bg-gradient-to-br to-transparent p-1">
          <div className="border-accent/5 bg-surface/40 grid overflow-hidden rounded-2xl border backdrop-blur-md md:grid-cols-2">
            {/* Left panel - Split into two sections */}
            <div className="from-accent/5 relative flex flex-col bg-gradient-to-br to-transparent">
              {/* Contact info header */}
              <div className="border-accent/10 p-8 md:border-b">
                <h3 className="text-text-primary mb-2 text-xl font-bold">
                  Let&#39;s build something together
                </h3>
                <p className="text-text-muted max-w-md">
                  <TypingText
                    text="Have a project in mind? I'd love to hear about it."
                    delay={30}
                  />
                </p>
              </div>

              {/* Social links and CTA */}
              <div className="flex flex-1 flex-col justify-between p-8">
                <div>
                  <div className="mb-6 flex space-x-4">
                    {socialLinks.map((link) => (
                      <motion.a
                        key={link.name}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-surface/60 text-text-muted hover:text-accent border-accent/10 flex h-10 w-10 items-center justify-center rounded-full border transition-colors"
                        whileHover={{ y: -3 }}
                        aria-label={link.name}
                      >
                        <link.icon size={18} />
                      </motion.a>
                    ))}
                  </div>

                  {/* Improved email section */}
                  <div className="bg-surface/30 border-accent/10 rounded-xl border p-5">
                    <h4 className="text-text-primary mb-3 flex items-center text-sm font-bold">
                      <Mail size={15} className="text-accent mr-2" />
                      Contact preferences
                    </h4>
                    <p className="text-text-muted mb-4 text-xs">
                      Select the appropriate category for your message. I&#39;ll receive your
                      message at the corresponding email address.
                    </p>
                    <div className="space-y-3">
                      {emailTypes.map((email) => (
                        <motion.div
                          key={email.id}
                          whileHover={{ x: 3 }}
                          className={`${
                            selectedEmailType === email.id
                              ? 'bg-accent/10 border-accent/30'
                              : 'bg-surface/40 border-accent/5 hover:border-accent/20'
                          } flex cursor-pointer items-center justify-between rounded-lg border p-2.5 transition-colors`}
                          onClick={() => setSelectedEmailType(email.id)}
                        >
                          <div>
                            <p className="text-text-primary text-sm font-medium">{email.type}</p>
                            <span className="text-text-muted text-xs">{email.description}</span>
                          </div>
                          <div
                            className={`h-4 w-4 rounded-full border ${
                              selectedEmailType === email.id
                                ? 'border-accent bg-accent/50'
                                : 'border-accent/30'
                            }`}
                          >
                            {selectedEmailType === email.id && (
                              <div className="bg-accent h-full w-full scale-50 rounded-full" />
                            )}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>

                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                  className="bg-surface/30 border-accent/10 mt-4 rounded-xl border p-5"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-text-primary text-sm font-bold">Response Time</h4>
                      <p className="text-text-muted text-sm">Usually within 24 hours</p>
                    </div>
                    <div className="bg-accent/10 text-accent flex h-12 w-12 items-center justify-center rounded-full">
                      <Clock size={20} />
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Right panel - Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex h-full flex-col p-8"
            >
              <form
                ref={formRef}
                onSubmit={handleSubmit}
                className="flex flex-1 flex-col space-y-5"
              >
                <div>
                  <label
                    htmlFor="name"
                    className="text-text-muted mb-1.5 block text-sm font-medium"
                  >
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className={`bg-surface/50 border-accent/10 focus:border-accent focus:ring-accent/20 w-full rounded-lg border p-3 text-sm transition-colors ${
                      errors.name ? 'border-red-400' : ''
                    }`}
                    disabled={formStatus === 'loading'}
                  />
                  {errors.name && (
                    <p className="mt-1 flex items-center text-xs text-red-400">
                      <AlertCircle size={12} className="mr-1" /> {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="text-text-muted mb-1.5 block text-sm font-medium"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className={`bg-surface/50 border-accent/10 focus:border-accent focus:ring-accent/20 w-full rounded-lg border p-3 text-sm transition-colors ${
                      errors.email ? 'border-red-400' : ''
                    }`}
                    disabled={formStatus === 'loading'}
                  />
                  {errors.email && (
                    <p className="mt-1 flex items-center text-xs text-red-400">
                      <AlertCircle size={12} className="mr-1" /> {errors.email}
                    </p>
                  )}
                </div>

                <div className="flex min-h-[120px] flex-1 flex-col">
                  <label
                    htmlFor="message"
                    className="text-text-muted mb-1.5 block text-sm font-medium"
                  >
                    Your Message
                  </label>
                  <div className="flex flex-1 flex-col">
                    <textarea
                      ref={textareaRef}
                      id="message"
                      name="message"
                      required
                      rows={3}
                      className={`bg-surface/50 border-accent/10 focus:border-accent focus:ring-accent/20 w-full flex-1 resize-none overflow-auto rounded-lg border p-3 text-sm transition-colors ${
                        errors.message ? 'border-red-400' : ''
                      }`}
                      disabled={formStatus === 'loading'}
                      onChange={adjustTextareaHeight}
                      onInput={adjustTextareaHeight}
                    ></textarea>
                    {errors.message && (
                      <p className="mt-1 flex items-center text-xs text-red-400">
                        <AlertCircle size={12} className="mr-1" /> {errors.message}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <motion.button
                    type="submit"
                    className="bg-accent hover:bg-accent/90 flex w-full items-center justify-center gap-2 rounded-lg px-6 py-3 text-sm font-medium text-white transition-colors disabled:opacity-70"
                    disabled={formStatus === 'loading'}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {formStatus === 'loading' ? (
                      <>
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <Send size={16} />
                        <span>Send Message</span>
                      </>
                    )}
                  </motion.button>
                </div>

                {/* Redesigned form status message to match response time card */}
                {(formStatus === 'success' || formStatus === 'error') && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-surface/30 border-accent/10 mt-4 rounded-xl border p-5"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-text-primary text-sm font-bold">
                          {formStatus === 'success' ? 'Message Sent' : 'Error'}
                        </h4>
                        <p className="text-text-muted text-sm">{formMessage}</p>
                      </div>
                      <div
                        className={`flex h-12 w-12 items-center justify-center rounded-full ${
                          formStatus === 'success'
                            ? 'bg-green-500/10 text-green-400'
                            : 'bg-red-500/10 text-red-400'
                        }`}
                      >
                        {formStatus === 'success' ? (
                          <CheckCircle size={20} />
                        ) : (
                          <XCircle size={20} />
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
