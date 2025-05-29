"use client"

import { useRef } from "react"
import {
  ArrowRight,
  FileText,
  Search,
  HelpCircle,
  Wrench,
  RefreshCw,
  ListFilter,
  CheckCircle,
  Users,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export default function FAQs() {
  const overviewRef = useRef<HTMLElement>(null)

  const scrollToOverview = () => {
    overviewRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const faqCategories = [
    {
      title: "General Questions",
      faqs: [
        {
          question: "What is AccountingZone?",
          answer: "AccountingZone is a comprehensive accounting and tax services platform that helps businesses and individuals manage their financial needs. We offer services including tax filing, business consulting, financial statements preparation, and payroll administration."
        },
        {
          question: "How do I get started with AccountingZone?",
          answer: "Getting started is easy! Simply create an account on our website, fill out the client information form, and our team will guide you through the process. You can also schedule a consultation to discuss your specific needs."
        },
        {
          question: "What types of businesses do you support?",
          answer: "We support businesses of all types including sole proprietorships, limited companies, trading companies, partnerships, and non-profit organizations. Our services are tailored to meet the specific needs of each business structure."
        }
      ]
    },
    {
      title: "Tax Services",
      faqs: [
        {
          question: "What tax services do you offer?",
          answer: "We offer comprehensive tax services including tax filing, tax planning, tax compliance, and tax consulting. Our services cover both individual and business tax needs, ensuring you meet all regulatory requirements while optimizing your tax position."
        },
        {
          question: "How do you handle tax deadlines?",
          answer: "We maintain a strict calendar of tax deadlines and ensure all filings are completed well before due dates. Our system sends automated reminders to clients, and our team proactively follows up to ensure timely submission of all required documents."
        },
        {
          question: "What documents do I need for tax filing?",
          answer: "Required documents typically include income statements, expense records, bank statements, previous tax returns, and any relevant tax certificates. The exact documents needed may vary based on your specific situation, which we'll discuss during your initial consultation."
        }
      ]
    },
    {
      title: "Business Services",
      faqs: [
        {
          question: "What accounting services do you provide?",
          answer: "We provide a full range of accounting services including bookkeeping, financial statement preparation, payroll administration, and business consulting. Our services can be customized to meet your specific needs, whether you need full-service accounting or just specific support."
        },
        {
          question: "How do you handle payroll administration?",
          answer: "Our payroll administration service includes handling salary calculations, tax deductions, time reporting, and expense management. We ensure compliance with all relevant regulations and provide detailed reports for your records."
        },
        {
          question: "Do you offer business consulting services?",
          answer: "Yes, we offer business consulting services to help you make informed financial decisions. Our consultants can assist with business planning, financial analysis, and strategic decision-making to help your business grow."
        }
      ]
    },
    {
      title: "Technical Support",
      faqs: [
        {
          question: "How can I contact technical support?",
          answer: "You can reach our technical support team through multiple channels: email, phone, or our online chat system. We aim to respond to all inquiries within 24 hours during business days."
        },
        {
          question: "What are your support hours?",
          answer: "Our support team is available Monday through Friday, 9 AM to 5 PM EST. For urgent matters outside these hours, we provide emergency contact options for our premium clients."
        },
        {
          question: "How secure is my financial data?",
          answer: "We take data security very seriously. We use industry-standard encryption, secure servers, and strict access controls to protect your information. All our systems comply with relevant data protection regulations."
        }
      ]
    }
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 flex flex-col items-center">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col justify-center items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">FAQs</h1>
                <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl">
                  Quick answers to common tax and support-related inquiries to help you resolve issues efficiently.
                </p>
              </div>
              <div className="mx-auto">
                <Button
                  className="inline-flex h-10 items-center justify-center rounded-md bg-[#fbc710] px-8 text-sm font-medium text-black shadow transition-colors hover:bg-[#fbc710]/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#fbc710] disabled:pointer-events-none disabled:opacity-50"
                  onClick={scrollToOverview}
                >
                  Explore FAQs
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section id="overview" ref={overviewRef} className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center space-y-4 text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Overview</h2>
              <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
                Our Frequently Asked Questions (FAQs) section provides quick answers to common tax and support-related
                inquiries, helping users resolve issues efficiently.
              </p>
            </div>
            <div className="mx-auto grid justify-center gap-8 sm:grid-cols-3 mt-12 max-w-6xl">
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#fbc710] text-black">
                  <HelpCircle className="h-8 w-8" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">Common Questions</h3>
                  <p className="text-muted-foreground">
                    Answers to the most frequently asked questions about tax filing, compliance, and software usage.
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#fbc710] text-black">
                  <Wrench className="h-8 w-8" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">Technical Support</h3>
                  <p className="text-muted-foreground">
                    Solutions to common technical issues and guidance on using our tax software effectively.
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#fbc710] text-black">
                  <RefreshCw className="h-8 w-8" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">Up-to-Date Information</h3>
                  <p className="text-muted-foreground">
                    Regularly updated content that reflects the latest tax laws, regulations, and software features.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="key-terms" className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center space-y-4 text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Key Features</h2>
              <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
                Essential resources to help you find answers quickly.
              </p>
            </div>
            <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8 mt-8 max-w-6xl">
              <Card className="h-full flex flex-col">
                <CardHeader className="flex items-center justify-center text-center">
                  <FileText className="h-8 w-8 mb-2 text-[#fbc710]" />
                  <CardTitle className="text-center">Comprehensive Tax FAQs</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow flex items-center justify-center">
                  <p className="text-muted-foreground text-center">Covering common filing and compliance questions.</p>
                </CardContent>
              </Card>
              <Card className="h-full flex flex-col">
                <CardHeader className="flex items-center justify-center text-center">
                  <Wrench className="h-8 w-8 mb-2 text-[#fbc710]" />
                  <CardTitle className="text-center">Troubleshooting Assistance</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow flex items-center justify-center">
                  <p className="text-muted-foreground text-center">
                    Addressing common technical or service-related concerns.
                  </p>
                </CardContent>
              </Card>
              <Card className="h-full flex flex-col">
                <CardHeader className="flex items-center justify-center text-center">
                  <RefreshCw className="h-8 w-8 mb-2 text-[#fbc710]" />
                  <CardTitle className="text-center">Regularly Updated Content</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow flex items-center justify-center">
                  <p className="text-muted-foreground text-center">Reflecting latest tax laws and user feedback.</p>
                </CardContent>
              </Card>
              <Card className="h-full flex flex-col">
                <CardHeader className="flex items-center justify-center text-center">
                  <Search className="h-8 w-8 mb-2 text-[#fbc710]" />
                  <CardTitle className="text-center">User-Friendly Search</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow flex items-center justify-center">
                  <p className="text-muted-foreground text-center">Easy navigation for quick answers.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section id="how-we-work" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center space-y-4 text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">How We Work</h2>
              <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
                Our approach to providing helpful and accurate FAQ content.
              </p>
            </div>
            <div className="mx-auto grid justify-center gap-4 sm:grid-cols-3 lg:gap-8 mt-12 max-w-6xl">
              <div className="flex flex-col items-center space-y-3 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#fbc710] text-black">
                  <ListFilter className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold">Categorized FAQs</h3>
                <p className="text-muted-foreground">Organized by topics for easy access.</p>
              </div>
              <div className="flex flex-col items-center space-y-3 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#fbc710] text-black">
                  <CheckCircle className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold">Expert-Verified Answers</h3>
                <p className="text-muted-foreground">Ensuring accuracy and reliability.</p>
              </div>
              <div className="flex flex-col items-center space-y-3 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#fbc710] text-black">
                  <Users className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold">User-Driven Updates</h3>
                <p className="text-muted-foreground">FAQs regularly updated based on customer queries.</p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Categories Section */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center space-y-4 text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Frequently Asked Questions</h2>
              <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
                Find answers to common questions about our services and support.
              </p>
            </div>
            
            <div className="mx-auto max-w-4xl mt-12">
              {faqCategories.map((category, index) => (
                <div key={index} className="mb-12">
                  <h3 className="text-2xl font-bold mb-6">{category.title}</h3>
                  <Accordion type="single" collapsible className="w-full">
                    {category.faqs.map((faq, faqIndex) => (
                      <AccordionItem key={faqIndex} value={`${index}-${faqIndex}`}>
                        <AccordionTrigger className="text-left font-semibold">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-20 bg-[#fbc710] text-black w-full">
          <div className="max-w-3xl mx-auto text-center space-y-6 px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Can't find your answer?</h2>
            <p className="text-lg text-black/90 max-w-2xl mx-auto">
              If you can't find the information you need in our FAQs, our support team is ready to help with your
              specific question.
            </p>
            <Button size="lg" variant="secondary" className="group bg-black text-white hover:bg-black/90">
              Contact Support
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </section>
      </main>
    </div>
  )
}
