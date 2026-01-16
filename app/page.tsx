"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Heart, Phone, Mail, CheckCircle, AlertCircle } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Poppins } from "next/font/google"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
})

export default function HomePage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null) // 'success', 'error', or null
  const [captchaValue, setCaptchaValue] = useState(null)

  useEffect(() => {
    // Set up global captcha callback
    window.setCaptchaValue = setCaptchaValue

    // Load reCAPTCHA script
    if (!document.querySelector('script[src*="recaptcha"]')) {
      const script = document.createElement('script')
      script.src = 'https://www.google.com/recaptcha/api.js'
      script.async = true
      script.defer = true
      document.head.appendChild(script)
    }

    // Define global callback
    window.onRecaptchaSuccess = function(token) {
      setCaptchaValue(token)
    }

    return () => {
      // Cleanup
      delete window.setCaptchaValue
      delete window.onRecaptchaSuccess
    }
  }, [])

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus(null)

    // Validate captcha
    if (!captchaValue) {
      setSubmitStatus('error')
      setIsSubmitting(false)
      return
    }

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          captchaToken: captchaValue
        }),
      })

      if (response.ok) {
        setSubmitStatus('success')
        setFormData({ firstName: '', lastName: '', email: '', message: '' })
        setCaptchaValue(null)
        // Reset reCAPTCHA
        if (window.grecaptcha) {
          window.grecaptcha.reset()
        }
      } else {
        setSubmitStatus('error')
      }
    } catch (error) {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Heart className="h-8 w-8 text-brand-primary" />
            <span className="text-2xl font-bold text-charcoal">The Empowering Path</span>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="#home" className="text-charcoal-light hover:text-brand-primary transition-colors">
              Home
            </Link>
            <Link href="#about" className="text-charcoal-light hover:text-brand-primary transition-colors">
              About
            </Link>
            <Link href="#services" className="text-charcoal-light hover:text-brand-primary transition-colors">
              Services
            </Link>
            <Link href="#testimonials" className="text-charcoal-light hover:text-brand-primary transition-colors">
              Testimonials
            </Link>
            <Link href="#contact" className="text-charcoal-light hover:text-brand-primary transition-colors">
              Contact
            </Link>
          </nav>
          <Button
            className="bg-accent hover-accent text-charcoal"
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
          >
            Get Started
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="relative bg-gradient-to-br from-bg-secondary to-white py-20 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-neutral rounded-full opacity-20 -translate-y-48 translate-x-48"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-light opacity-30 transform rotate-45 -translate-x-32 translate-y-32"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl lg:text-5xl font-bold text-charcoal leading-tight lg:leading-normal tracking-normal">
                  Should I Stay or<br />
                  Should I Go?
                  <br />
                  <span className="text-brand-primary text-2xl lg:text-3xl block mt-2">Virtual Coaching for Women Nationwide</span>
                </h1>
                <p className="text-xl text-charcoal-light leading-relaxed">
                  Are you struggling with the decision to Stay or Go in your marriage? Through secure virtual sessions, I help women across the United States navigate this difficult decision with confidence and clarity from the comfort of their own homes.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-accent hover-accent text-charcoal px-8 py-4"
                  onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                >
                  Get Started
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-accent text-charcoal-lighter hover:bg-accent-lighter px-8 py-4 bg-transparent"
                  onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
                >
                  Learn More
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-full h-full bg-brand-light rounded-2xl opacity-30"></div>
              <Image
                src="/images/relationship-coach-nashville-consultation.jpg"
                alt="Virtual relationship coaching consultation with Blakely Patterson, licensed marriage therapist providing online coaching sessions for women nationwide making difficult marriage decisions"
                width={600}
                height={400}
                className="relative rounded-2xl shadow-2xl object-cover"
                priority // Critical for above-the-fold content
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Testimonial Section */}
      <section className="py-16 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-muted rounded-full opacity-20 -translate-y-32 translate-x-32"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-accent-lighter rounded-3xl p-8 md:p-12 relative">
              <div className="absolute top-4 left-8 text-accent text-6xl font-serif opacity-60">"</div>
              <div className="absolute bottom-4 right-8 text-accent text-6xl font-serif rotate-180 opacity-60">"</div>

              <blockquote className="text-lg md:text-xl text-charcoal leading-relaxed italic mb-6 relative z-10">
                From our very first session, Blakely has consistently seen me for who I truly am, without judgment or
                bias...Her ability to create a safe and nurturing environment allowed me to open up in a way I have
                never been able to.
              </blockquote>

              <div className="flex items-center justify-center space-x-4">
                <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg">M</span>
                </div>
                <div className="text-left">
                  <p className="font-semibold text-charcoal">Mary J.</p>
                  <p className="text-sm text-charcoal-light">Coaching Client</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="absolute -bottom-4 -right-4 w-full h-full bg-muted rounded-2xl"></div>
              <Image
                src="/images/blakely-patterson-life-coach-office.jpg"
                alt="Blakely Patterson, licensed marriage and family therapist providing virtual relationship coaching nationwide for women making confident marriage decisions from home office"
                width={500}
                height={600}
                className="relative rounded-2xl shadow-xl object-cover"
                loading="lazy"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 500px"
              />
            </div>
            <div className="space-y-6">
              <div className="space-y-4">
                <h2 className="text-4xl font-bold text-charcoal">About Me</h2>
                <p className="text-lg text-charcoal-light leading-relaxed">
                  My name is Blakely Patterson and I am a relationship coach who helps women who are struggling in their
                  marriages decide if their relationship can be saved or if they need to move forward with divorce. I now provide all coaching services virtually, allowing me to support women across the United States.
                </p>
                <p className="text-lg text-charcoal-light leading-relaxed">
                  For more than 15 years I practiced as a Marriage and Family Therapist helping couples navigate the
                  complexities of their relationships. Over the years, I noticed several patterns…the most important
                  being that many couples--even after multiple therapists and/or years of therapy--were still struggling
                  to decide: Can we rebuild this? or Is it time to let go?
                </p>
                <p className="text-lg text-charcoal-light leading-relaxed">
                  This realization inspired me to create a new practice with a different kind of support. Now, as a Life
                  Coach, I empower individuals to confront this critical question head-on. Through a blend of practical
                  tools and compassionate guidance, I will help you evaluate your own priorities, assess your current
                  path, and establish a realistic plan to move forward, either with your partner or without.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-secondary relative overflow-hidden">
        <div className="absolute top-0 left-0 w-72 h-72 bg-brand-light rounded-full opacity-10 -translate-x-36 -translate-y-36"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-charcoal mb-4">My Specialties</h2>
            <p className="text-xl text-charcoal-light max-w-3xl mx-auto">
              I provide compassionate, expert guidance to help you navigate life's most challenging relationship
              decisions
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Card 1: Should I Stay or Go */}
            <div className="group relative h-72 md:h-96">
              {/* Background Image */}
              <div className="absolute left-0 top-0 w-3/5 md:w-2/3 h-full rounded-2xl overflow-hidden shadow-lg">
                <Image
                  src="/images/marriage-decision-coaching-woman.jpg"
                  alt="Woman contemplating difficult marriage decision during virtual coaching session - online should I stay or go relationship coaching available nationwide"
                  width={400}
                  height={320}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 400px"
                />
              </div>

              {/* Overlapping Content Card */}
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3/5 md:w-1/2 bg-white rounded-2xl shadow-xl p-7 md:p-10 z-10 hover:shadow-2xl transition-all duration-300">
                <div className="space-y-4">
                  <span className="text-brand-primary text-sm font-medium uppercase tracking-wide">Guidance</span>
                  <h3 className="text-xl md:text-2xl font-bold text-charcoal leading-tight">
                    Should I Stay or Should I Go?
                  </h3>
                  <button className="text-accent hover:text-charcoal font-medium text-sm transition-colors group-hover:underline">
                    Learn More →
                  </button>
                </div>
              </div>

              {/* Expandable Content */}
              <div className="absolute inset-0 bg-white/95 backdrop-blur-sm rounded-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 p-8 md:p-10 flex items-center justify-center shadow-xl z-30">
                <div className="text-center space-y-4 max-w-sm">
                  <h3 className="text-2xl font-bold text-charcoal">Making the Decision</h3>
                  <p className="text-charcoal-light text-base leading-relaxed">
                    I understand that deciding whether to stay and rebuild your marriage or move on can be one of the
                    most difficult decisions you'll ever face. My approach is rooted in compassion, respect, and a deep
                    commitment to your personal growth and well-being.
                  </p>
                </div>
              </div>
            </div>

            {/* Card 2: Rebuilding Marriage */}
            <div className="group relative h-72 md:h-96">
              {/* Background Image */}
              <div className="absolute left-0 top-0 w-3/5 md:w-2/3 h-full rounded-2xl overflow-hidden shadow-lg">
                <Image
                  src="/images/marriage-rebuild-hope-staircase.jpg"
                  alt="Hope and rebuilding marriage through virtual coaching - woman participating in online relationship coaching session for marriage reconstruction"
                  width={400}
                  height={320}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 400px"
                />
              </div>

              {/* Overlapping Content Card */}
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3/5 md:w-1/2 bg-white rounded-2xl shadow-xl p-7 md:p-10 z-10 hover:shadow-2xl transition-all duration-300">
                <div className="space-y-4">
                  <span className="text-brand-primary text-sm font-medium uppercase tracking-wide">Rebuilding</span>
                  <h3 className="text-xl md:text-2xl font-bold text-charcoal leading-tight">Rebuilding My Marriage</h3>
                  <button className="text-accent hover:text-charcoal font-medium text-sm transition-colors group-hover:underline">
                    Learn More →
                  </button>
                </div>
              </div>

              {/* Expandable Content */}
              <div className="absolute inset-0 bg-white/95 backdrop-blur-sm rounded-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 p-8 md:p-10 flex items-center justify-center shadow-xl z-30">
                <div className="text-center space-y-4 max-w-sm">
                  <h3 className="text-2xl font-bold text-charcoal">Rebuilding Together</h3>
                  <p className="text-charcoal-light text-base leading-relaxed">
                    If you're considering giving your marriage another chance, I can help you learn strategies to
                    restore trust, deepen the connection with your partner, develop effective communication skills to
                    express your needs, and discover ways to foster a more fulfilling relationship.
                  </p>
                </div>
              </div>
            </div>

            {/* Card 3: Empowering Independence */}
            <div className="group relative h-72 md:h-96">
              {/* Background Image */}
              <div className="absolute left-0 top-0 w-3/5 md:w-2/3 h-full rounded-2xl overflow-hidden shadow-lg">
                <Image
                  src="/images/women-empowerment-independence-coaching.jpg"
                  alt="Women's empowerment through virtual coaching - celebrating personal growth and confident life decisions via online relationship coaching sessions"
                  width={400}
                  height={320}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 400px"
                />
              </div>

              {/* Overlapping Content Card */}
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3/5 md:w-1/2 bg-white rounded-2xl shadow-xl p-7 md:p-10 z-10 hover:shadow-2xl transition-all duration-300">
                <div className="space-y-4">
                  <span className="text-brand-primary text-sm font-medium uppercase tracking-wide">Independence</span>
                  <h3 className="text-xl md:text-2xl font-bold text-charcoal leading-tight">
                    Empowering Your Independence
                  </h3>
                  <button className="text-accent hover:text-charcoal font-medium text-sm transition-colors group-hover:underline">
                    Learn More →
                  </button>
                </div>
              </div>

              {/* Expandable Content */}
              <div className="absolute inset-0 bg-white/95 backdrop-blur-sm rounded-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 p-8 md:p-10 flex items-center justify-center shadow-xl z-30">
                <div className="text-center space-y-4 max-w-sm">
                  <h3 className="text-2xl font-bold text-charcoal">Moving Forward</h3>
                  <p className="text-charcoal-light text-base leading-relaxed">
                    Should you decide that moving on is the best choice for you, I am here to guide you through that
                    transition. I will help you navigate difficult conversations with your loved ones and guide you
                    through decisions about outside support and resources.
                  </p>
                </div>
              </div>
            </div>

            {/* Card 4: Navigating an Affair */}
            <div className="group relative h-72 md:h-96">
              {/* Background Image */}
              <div className="absolute left-0 top-0 w-3/5 md:w-2/3 h-full rounded-2xl overflow-hidden shadow-lg">
                <Image
                  src="/images/affair-recovery-relationship-coaching.jpg"
                  alt="Navigating affair recovery through virtual relationship coaching - online support for complex relationship challenges without judgment"
                  width={400}
                  height={320}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 400px"
                />
              </div>

              {/* Overlapping Content Card */}
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3/5 md:w-1/2 bg-white rounded-2xl shadow-xl p-7 md:p-10 z-10 hover:shadow-2xl transition-all duration-300">
                <div className="space-y-4">
                  <span className="text-brand-primary text-sm font-medium uppercase tracking-wide">Support</span>
                  <h3 className="text-xl md:text-2xl font-bold text-charcoal leading-tight">Navigating an Affair</h3>
                  <button className="text-accent hover:text-charcoal font-medium text-sm transition-colors group-hover:underline">
                    Learn More →
                  </button>
                </div>
              </div>

              {/* Expandable Content */}
              <div className="absolute inset-0 bg-white/95 backdrop-blur-sm rounded-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 p-8 md:p-10 flex items-center justify-center shadow-xl z-30">
                <div className="text-center space-y-4 max-w-sm">
                  <h3 className="text-2xl font-bold text-charcoal">Complex Emotions</h3>
                  <p className="text-charcoal-light text-base leading-relaxed">
                    My years of experience working with couples tell me it is far more common than you probably know,
                    and it is incredibly difficult to talk about with friends or family. I want to create an environment
                    free from guilt, shame, and judgment.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Empowerment Section with Stock Photo */}
      <section className="py-20 bg-neutral relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-light rounded-full opacity-20 -translate-y-48 translate-x-48"></div>

        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl font-bold text-charcoal">You Don't Have to Navigate This Alone</h2>
              <p className="text-lg text-charcoal-light leading-relaxed">
                Making life-changing decisions about your relationship can feel overwhelming and isolating. My
                compassionate, non-judgmental approach provides you with the clarity and confidence you need to move
                forward with certainty.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-brand-lighter rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-brand-primary rounded-full"></div>
                  </div>
                  <span className="text-charcoal">Safe, judgment-free environment</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-brand-lighter rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-brand-primary rounded-full"></div>
                  </div>
                  <span className="text-charcoal">Practical tools and strategies</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-brand-lighter rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-brand-primary rounded-full"></div>
                  </div>
                  <span className="text-charcoal">Personalized guidance for your unique situation</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -bottom-4 -left-4 w-full h-full bg-brand-light rounded-2xl opacity-30"></div>
              <Image
                src="/images/professional-coaching-conversation.jpg"
                alt="Virtual relationship coaching conversation providing supportive guidance and compassionate listening through secure online video sessions nationwide"
                width={600}
                height={500}
                className="relative rounded-2xl shadow-2xl object-cover"
                loading="lazy"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Coaching vs Therapy Section */}
      <section className="py-20 bg-white relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-muted rounded-full opacity-20 -translate-x-48 -translate-y-48"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-neutral rounded-full opacity-30 translate-x-40 translate-y-40"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-charcoal text-center mb-4">Coaching vs. Therapy</h2>
            <p className="text-xl text-charcoal-light text-center mb-16">How is it different?</p>

            <div className="relative">
              {/* Central VS Element */}
              <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
                <div className="w-20 h-20 bg-white border-4 border-brand rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-2xl font-bold text-brand-primary">VS</span>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8 md:gap-16">
                {/* Therapy Card */}
                <Card className="relative p-8 bg-gradient-to-br from-bg-secondary to-bg-muted border-2 border-transparent overflow-hidden">
                  {/* Tree roots background pattern */}
                  <div className="absolute inset-0 opacity-10">
                    <svg className="w-full h-full" viewBox="0 0 400 300" fill="none">
                      <path
                        d="M200 50 Q180 80 160 120 Q140 160 120 200 Q100 240 80 280"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="text-charcoal-lighter"
                      />
                      <path
                        d="M200 50 Q220 80 240 120 Q260 160 280 200 Q300 240 320 280"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="text-charcoal-lighter"
                      />
                      <path
                        d="M200 50 Q190 90 180 140 Q170 180 160 220"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        className="text-charcoal-lighter"
                      />
                      <path
                        d="M200 50 Q210 90 220 140 Q230 180 240 220"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        className="text-charcoal-lighter"
                      />
                      <circle cx="200" cy="50" r="8" fill="currentColor" className="text-charcoal-lighter" />
                    </svg>
                  </div>

                  <CardContent className="space-y-4 relative z-10">
                    <div className="flex items-center space-x-3 mb-6">
                      <div className="w-3 h-3 bg-charcoal-lighter rounded-full"></div>
                      <h3 className="text-2xl font-bold text-charcoal">Therapy</h3>
                      <div className="w-3 h-3 bg-charcoal-lighter rounded-full"></div>
                    </div>
                    <div className="bg-white/70 backdrop-blur-sm rounded-lg p-4">
                      <p className="text-charcoal leading-relaxed font-medium mb-3">
                        <span className="text-charcoal-light font-semibold">Past & Present Focused</span>
                      </p>
                      <p className="text-charcoal-light leading-relaxed">
                        Therapy focuses on mental health and emotional healing. It enables clients to develop a greater
                        understanding of how their past experiences and thought patterns influence their behaviors and
                        emotions. Often the goal in Marriage Counseling is to build communication skills, learn to
                        resolve conflict, and understand and change behaviors, thoughts and emotions that negatively
                        impact relationships.
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Coaching Card */}
                <Card className="relative p-8 bg-gradient-to-br from-bg-muted to-bg-brand-lighter border-2 border-transparent overflow-hidden">
                  {/* Mountain path background pattern */}
                  <div className="absolute inset-0 opacity-10">
                    <svg className="w-full h-full" viewBox="0 0 400 300" fill="none">
                      <path
                        d="M50 250 Q100 200 150 180 Q200 160 250 140 Q300 120 350 100"
                        stroke="currentColor"
                        strokeWidth="3"
                        className="text-brand-primary"
                      />
                      <path
                        d="M40 260 Q90 210 140 190 Q190 170 240 150 Q290 130 340 110"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="text-brand-primary"
                      />
                      <polygon
                        points="320,80 340,100 360,85 350,65"
                        fill="currentColor"
                        className="text-brand-primary"
                      />
                      <circle cx="80" cy="240" r="6" fill="currentColor" className="text-brand-primary" />
                      <path
                        d="M100 180 L120 160 L140 180 L120 200 Z"
                        fill="currentColor"
                        className="text-brand-primary opacity-50"
                      />
                      <path
                        d="M200 140 L220 120 L240 140 L220 160 Z"
                        fill="currentColor"
                        className="text-brand-primary opacity-50"
                      />
                    </svg>
                  </div>

                  <CardContent className="space-y-4 relative z-10">
                    <div className="flex items-center space-x-3 mb-6">
                      <div className="w-3 h-3 bg-brand-primary rounded-full"></div>
                      <h3 className="text-2xl font-bold text-charcoal">Life Coaching</h3>
                      <div className="w-3 h-3 bg-brand-primary rounded-full"></div>
                    </div>
                    <div className="bg-white/70 backdrop-blur-sm rounded-lg p-4">
                      <p className="text-charcoal leading-relaxed font-medium mb-3">
                        <span className="text-brand-primary font-semibold">Present & Future Focused</span>
                      </p>
                      <p className="text-charcoal-light leading-relaxed">
                        Life coaching is present and future-oriented and focuses on setting and achieving personal
                        goals. The relationship between you and your coach is more of a collaborative partnership that
                        will help you identify your values, overcome obstacles, and set actionable goals to create a
                        life you love.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div className="text-center mt-12">
              <div className="bg-accent-lighter rounded-2xl p-8 max-w-3xl mx-auto">
                <p className="text-lg text-charcoal leading-relaxed">
                  <span className="font-semibold text-brand-primary">Both coaching and therapy can be incredibly beneficial.</span> It is
                  important to understand the differences so that you can make an informed decision about your choice of
                  professional support and the best path forward for you.
                </p>

                <div className="mt-6 bg-white/50 rounded-lg p-4 border-l-4 border-gray-400">
                    <p className="text-sm text-charcoal-light">
                    I also maintain a separate, traditional therapy practice for Tennessee residents requiring in-person couples counseling. 
                    That practice operates under different licensing requirements and is not related to my nationwide virtual coaching services. 
                    More information available at{" "}
                    <a
                      href="https://www.blakelypatterson.com"
                      className="text-brand-primary hover:text-charcoal font-medium"
                      rel="nofollow noopener"
                      target="_blank"
                    >
                      www.blakelypatterson.com
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Journey Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative order-2 lg:order-1">
              <div className="absolute -top-4 -right-4 w-full h-full bg-muted rounded-2xl opacity-40"></div>
              <Image
                src="/images/self-reflection-clarity-coaching.jpg"
                alt="Self-reflection and gaining clarity through virtual relationship coaching - woman participating in online coaching session for personal growth and confident decision-making"
                width={500}
                height={400}
                className="relative rounded-2xl shadow-xl object-cover"
                loading="lazy"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 500px"
              />
            </div>
            <div className="space-y-6 order-1 lg:order-2">
              <h2 className="text-4xl font-bold text-charcoal">Your Journey to Clarity Starts Here</h2>
              <p className="text-lg text-charcoal-light leading-relaxed">
                Whether you're leaning toward rebuilding your marriage or moving toward independence, I'll walk
                alongside you every step of the way. Together, we'll create a clear path forward that honors your values
                and supports your well-being.
              </p>
              <Button
                className="bg-accent hover-accent text-charcoal px-8 py-4"
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              >
                Let's Talk
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-secondary relative overflow-hidden">
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-brand-light rounded-full opacity-10 translate-x-40 translate-y-40"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-charcoal mb-4">What My Clients Say</h2>
            <p className="text-xl text-charcoal-light">Real stories from women who found their path forward</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="p-6 bg-white shadow-lg">
              <CardContent className="space-y-4">
                <p className="text-charcoal-light italic leading-relaxed">
                  "Blakely has been an incredible support to me. When I found her I was sure that I wanted a divorce.
                  After working together for a short time, I was able to recognize that I had not yet done enough to
                  make that decision. She helped me sort it out and find the strength to try again with a healthier
                  approach."
                </p>
                <div className="text-right">
                  <p className="font-semibold text-charcoal">- Brittany F.</p>
                </div>
              </CardContent>
            </Card>

            <Card className="p-6 bg-white shadow-lg">
              <CardContent className="space-y-4">
                <p className="text-charcoal-light italic leading-relaxed">
                  "When I called Blakely I knew my marriage was over, I just didn't know how to leave. I didn't know how
                  to protect myself or my children. I needed a path, and she was able to provide it. Because of her
                  support, I was able to manage all of the feelings without exhausting my friends and family!"
                </p>
                <div className="text-right">
                  <p className="font-semibold text-charcoal">- Allison H.</p>
                </div>
              </CardContent>
            </Card>

            <Card className="p-6 bg-white shadow-lg">
              <CardContent className="space-y-4">
                <p className="text-charcoal-light italic leading-relaxed">
                  "From our very first session, Blakely has consistently seen me for who I truly am, without judgment or
                  bias. She met me where I was that day and has since walked me through some of the hardest moments of
                  my life. Her ability to create a safe and nurturing environment allowed me to open up in a way I have
                  never been able to."
                </p>
                <div className="text-right">
                  <p className="font-semibold text-charcoal">- Mary J.</p>
                </div>
              </CardContent>
            </Card>

            <Card className="p-6 bg-white shadow-lg">
              <CardContent className="space-y-4">
                <p className="text-charcoal-light italic leading-relaxed">
                  "Blakely's empathetic nature and extensive knowledge have equipped her to help others navigate their
                  own journey. She has a unique ability to listen intently, remember the details, and provide guidance
                  that resonates on a personal level."
                </p>
                <div className="text-right">
                  <p className="font-semibold text-charcoal">- Jackie C.</p>
                </div>
              </CardContent>
            </Card>

            <Card className="p-6 bg-white shadow-lg md:col-span-2 lg:col-span-1">
              <CardContent className="space-y-4">
                <p className="text-charcoal-light italic leading-relaxed">
                  "Blakely is genuine and open and will pick up and walk with you no matter where you are. I have made
                  some bad relationship decisions, but I knew I could tell her anything. She welcomed me without
                  judgment and helped me move from confusion and shame to a place of confident peace."
                </p>
                <div className="text-right">
                  <p className="font-semibold text-charcoal">- Terri M.</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-charcoal mb-4">Ready to Start Your Journey?</h2>
              <p className="text-xl text-charcoal-light">
                Take the first step towards clarity and confidence in your relationship decisions
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12">
              <div className="space-y-8">
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-brand-lighter rounded-full flex items-center justify-center">
                      <Phone className="h-6 w-6 text-brand-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-charcoal">Phone</h3>
                      <p className="text-charcoal-light">(615) 631-4279</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-brand-lighter rounded-full flex items-center justify-center">
                      <Mail className="h-6 w-6 text-brand-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-charcoal">Email</h3>
                      <p className="text-charcoal-light">blakelypattersoncoaching@gmail.com</p>
                    </div>
                  </div>
                </div>

                <div className="bg-muted p-8 rounded-2xl">
                  <h3 className="text-2xl font-bold text-charcoal mb-4">Free Consultation Available</h3>
                  <p className="text-charcoal-light mb-4">
                    I offer a complimentary 30-minute virtual consultation to discuss your situation and see if coaching is right for you.  Virtual sessions offer the same level of personal attention and professional guidance as in-person meetings, with the added benefit of participating from your own comfortable, private space.
                  </p>

                  <p className="text-charcoal font-medium text-sm">✓ No obligation</p>
                  <p className="text-charcoal font-medium text-sm">✓ Completely confidential</p>
                  <p className="text-charcoal font-medium text-sm">✓ Personalized guidance</p>
                </div>
              </div>

              <Card className="p-8">
                <CardContent className="space-y-6">
                  <h3 className="text-2xl font-bold text-charcoal">Send a Message</h3>

                  {/* Success Message */}
                  {submitStatus === 'success' && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <div>
                        <p className="text-green-800 font-medium">Message sent successfully!</p>
                        <p className="text-green-700 text-sm">Thank you for reaching out. I'll get back to you within 24 hours.</p>
                      </div>
                    </div>
                  )}

                  {/* Error Message */}
                  {submitStatus === 'error' && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center space-x-3">
                      <AlertCircle className="h-5 w-5 text-red-600" />
                      <div>
                        <p className="text-red-800 font-medium">Failed to send message</p>
                        <p className="text-red-700 text-sm">Please try again or contact me directly via phone or email.</p>
                      </div>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-charcoal mb-2">First Name</label>
                        <Input 
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          placeholder="Your first name" 
                          required 
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-charcoal mb-2">Last Name</label>
                        <Input 
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          placeholder="Your last name" 
                          required 
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-charcoal mb-2">Email</label>
                      <Input 
                        type="email" 
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="your.email@gmail.com" 
                        required 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-charcoal mb-2">Message</label>
                      <Textarea 
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Tell me a bit about your situation and how I can help..." 
                        rows={4} 
                        required 
                      />
                    </div>

                    {/* reCAPTCHA */}
                    <div className="flex justify-center">
                      <div 
                        className="g-recaptcha" 
                        data-sitekey="6Ldg6YIrAAAAANdBf8YFSCYlr76ij-HJRC8Kuog7"
                        data-callback="onRecaptchaSuccess"
                      ></div>
                    </div>

                    <Button 
                      type="submit" 
                      disabled={isSubmitting || !captchaValue}
                      className="bg-accent hover-accent text-charcoal w-full disabled:opacity-50"
                    >
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-secondary text-charcoal py-8">
        <div className="container mx-auto px-4">
          {/* Brand Section - Full Width */}
          <div className="text-center mb-6 pb-6">
            <div className="flex items-center justify-center space-x-2 mb-1">
              <Heart className="h-6 w-6 text-charcoal" />
              <span className="text-xl font-bold">The Empowering Path</span>
            </div>
            <p className="text-charcoal max-w-2xl mx-auto">
              Empowering women to make confident decisions about their lives and relationships.
            </p>
          </div>

          <div className="text-center">
            <p className="text-charcoal-light">
              © {new Date().getFullYear()} The Empowering Path. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "ProfessionalService",
                "@id": "https://www.theempoweringpath.com/#business",
                "name": "The Empowering Path - Virtual Relationship Coaching",
                "description": "Virtual relationship coaching for women nationwide facing difficult marriage decisions. Expert online guidance on whether to stay and rebuild or move forward with confidence.",
                "url": "https://www.theempoweringpath.com",
                "telephone": "(615) 631-4279",
                "email": "blakelypattersoncoaching@gmail.com",
                "priceRange": "$",
                "serviceType": [
                  "Virtual Relationship Coaching",
                  "Online Life Coaching",
                  "Remote Marriage Decision Counseling",
                  "Virtual Women's Empowerment Coaching"
                ],
                "serviceOutput": [
                  "Marriage Decision Clarity",
                  "Relationship Confidence",
                  "Personal Empowerment",
                  "Life Direction Planning"
                ],
                "areaServed": {
                  "@type": "Country",
                  "name": "United States"
                },
                "availableChannel": {
                  "@type": "ServiceChannel",
                  "serviceType": "Virtual Coaching Sessions",
                  "availableLanguage": "English"
                },
                "hasOfferCatalog": {
                  "@type": "OfferCatalog",
                  "name": "Virtual Coaching Services",
                  "itemListElement": [
                    {
                      "@type": "Offer",
                      "itemOffered": {
                        "@type": "Service",
                        "name": "Virtual Should I Stay or Go Coaching",
                        "description": "Online coaching sessions for women deciding whether to rebuild their marriage or move forward independently"
                      },
                      "availableDeliveryMethod": "OnlineOnly"
                    },
                    {
                      "@type": "Offer", 
                      "itemOffered": {
                        "@type": "Service",
                        "name": "Virtual Marriage Rebuilding Support",
                        "description": "Remote guidance for women choosing to work on rebuilding their marriages"
                      },
                      "availableDeliveryMethod": "OnlineOnly"
                    },
                    {
                      "@type": "Offer",
                      "itemOffered": {
                        "@type": "Service", 
                        "name": "Virtual Independence Empowerment Coaching",
                        "description": "Online support for women choosing to move forward independently"
                      },
                      "availableDeliveryMethod": "OnlineOnly"
                    }
                  ]
                }
              },
              {
                "@type": "Person",
                "@id": "https://www.theempoweringpath.com/#person",
                "name": "Blakely Patterson",
                "jobTitle": "Virtual Relationship Coach & Licensed Marriage and Family Therapist",
                "description": "Licensed Marriage and Family Therapist with 15+ years experience, now specializing in virtual relationship coaching for women nationwide making difficult marriage decisions.",
                "url": "https://www.thempoweringpath.com",
                "email": "blakelypattersoncoaching@gmail.com",
                "telephone": "(615) 631-4279",
                "worksFor": {
                  "@id": "https://www.theempoweringpath.com/#business"
                },
                "hasCredential": [
                  {
                    "@type": "EducationalOccupationalCredential",
                    "credentialCategory": "Professional License",
                    "name": "Licensed Marriage and Family Therapist"
                  }
                ],
                "knowsAbout": [
                  "Virtual Relationship Coaching",
                  "Online Marriage Counseling", 
                  "Remote Life Coaching",
                  "Women's Empowerment",
                  "Marriage Decision Making",
                  "Affair Recovery",
                  "Virtual Therapy Sessions"
                ],
                "serviceArea": {
                  "@type": "Country",
                  "name": "United States"
                },
                "alumniOf": "Marriage and Family Therapy Program"
              },
              {
                "@type": "WebSite",
                "@id": "https://www.theempoweringpath.com/#website",
                "url": "https://www.theempoweringpath.com",
                "name": "The Empowering Path - Virtual Relationship Coaching",
                "description": "Virtual relationship coaching for women nationwide facing difficult marriage decisions",
                "publisher": {
                  "@id": "https://www.theempoweringpath.com/#person"
                },
                "inLanguage": "en-US",
                "audience": {
                  "@type": "Audience",
                  "name": "Women in the United States seeking relationship guidance",
                  "geographicArea": {
                    "@type": "Country",
                    "name": "United States"
                  }
                }
              }
            ]
          })
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "VirtualLocation",
            "name": "Virtual Relationship Coaching Sessions",
            "description": "Secure online coaching sessions available nationwide",
            "url": "https://www.theempoweringpath.com",
            "hostedBy": {
              "@type": "Person",
              "name": "Blakely Patterson",
              "jobTitle": "Virtual Relationship Coach"
            },
            "isAccessibleForFree": false,
            "maximumAttendeeCapacity": 1,
            "eventAttendanceMode": "OnlineEventAttendanceMode"
          })
        }}
      />

      {/* FAQ Page Schema for Virtual Services */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "Do you offer virtual coaching sessions nationwide?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes! All my coaching sessions are conducted virtually via secure video conferencing, making my services available to women across the United States. Virtual sessions are just as effective as in-person meetings and offer the convenience of participating from your own safe space."
                }
              },
              {
                "@type": "Question",
                "name": "How do virtual relationship coaching sessions work?",
                "acceptedAnswer": {
                  "@type": "Answer", 
                  "text": "Virtual sessions are conducted through secure, HIPAA-compliant video conferencing platforms. You'll receive a private link for each session, and we'll meet online just as we would in person. Many clients find virtual sessions more comfortable and convenient."
                }
              },
              {
                "@type": "Question",
                "name": "What states do you serve for virtual coaching?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "I provide virtual relationship coaching to women throughout the United States. As a life coach (not providing therapy), I can work with clients nationwide. My coaching focuses on decision-making, goal-setting, and personal empowerment."
                }
              }
            ]
          })
        }}
      />
    </div>
  )
}