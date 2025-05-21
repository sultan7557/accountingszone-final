"use client"

import { ArrowRight, Clock, Award, BookOpen, Layers, Users, Video } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function OnlineCourses() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 flex flex-col items-center">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col justify-center items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  Online Courses on Tax and Accounting
                </h1>
                <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl">
                  Our self-paced and instructor-led online courses help individuals and professionals gain expertise in
                  tax preparation, financial management, and accounting software.
                </p>
              </div>
              <div className="mx-auto">
                <Button
                  className="inline-flex h-10 items-center justify-center rounded-md bg-[#fbc710] px-8 text-sm font-medium text-black shadow transition-colors hover:bg-[#fbc710]/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#fbc710] disabled:pointer-events-none disabled:opacity-50"
                  onClick={() => {
                    const overviewElement = document.getElementById("overview");
                    if (overviewElement) {
                      overviewElement.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                >
                  Explore Courses
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section id="overview" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center space-y-4 text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Overview</h2>
              <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
                Our self-paced and instructor-led online courses help individuals and professionals gain expertise in
                tax preparation, financial management, and accounting software.
              </p>
            </div>
            <div className="mx-auto grid justify-center gap-8 sm:grid-cols-3 mt-12 max-w-6xl">
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#fbc710] text-black">
                  <Award className="h-8 w-8" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">Certified Courses</h3>
                  <p className="text-muted-foreground">
                    Gain recognized credentials in tax and accounting through our professionally certified courses.
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#fbc710] text-black">
                  <Layers className="h-8 w-8" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">All Skill Levels</h3>
                  <p className="text-muted-foreground">
                    From beginner to advanced levels, our courses cater to learners at every stage of their professional
                    journey.
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#fbc710] text-black">
                  <Video className="h-8 w-8" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">Interactive Learning</h3>
                  <p className="text-muted-foreground">
                    Engaging video lectures, practical assignments, and knowledge-testing quizzes enhance your learning
                    experience.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="key-features" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center space-y-4 text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Key Features</h2>
              <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
                What makes our online courses stand out from the rest.
              </p>
            </div>
            <div className="mx-auto grid justify-center gap-6 sm:grid-cols-2 lg:grid-cols-4 mt-12 max-w-6xl">
              <Card className="h-full flex flex-col">
                <CardHeader className="flex flex-col items-center justify-center text-center">
                  <Award className="h-8 w-8 mb-2 text-[#fbc710]" />
                  <CardTitle>Certified Courses</CardTitle>
                </CardHeader>
                <CardContent className="flex-1 flex items-center justify-center">
                  <p className="text-muted-foreground text-center">
                    Gain recognized credentials in tax and accounting.
                  </p>
                </CardContent>
              </Card>
              <Card className="h-full flex flex-col">
                <CardHeader className="flex flex-col items-center justify-center text-center">
                  <Layers className="h-8 w-8 mb-2 text-[#fbc710]" />
                  <CardTitle>Beginner to Advanced</CardTitle>
                </CardHeader>
                <CardContent className="flex-1 flex items-center justify-center">
                  <p className="text-muted-foreground text-center">
                    Courses for all skill levels, from beginners to experts.
                  </p>
                </CardContent>
              </Card>
              <Card className="h-full flex flex-col">
                <CardHeader className="flex flex-col items-center justify-center text-center">
                  <Video className="h-8 w-8 mb-2 text-[#fbc710]" />
                  <CardTitle>Interactive Learning</CardTitle>
                </CardHeader>
                <CardContent className="flex-1 flex items-center justify-center">
                  <p className="text-muted-foreground text-center">
                    Engaging video lectures, assignments, and quizzes.
                  </p>
                </CardContent>
              </Card>
              <Card className="h-full flex flex-col">
                <CardHeader className="flex flex-col items-center justify-center text-center">
                  <Users className="h-8 w-8 mb-2 text-[#fbc710]" />
                  <CardTitle>Expert Instructors</CardTitle>
                </CardHeader>
                <CardContent className="flex-1 flex items-center justify-center">
                  <p className="text-muted-foreground text-center">Learn from top industry professionals.</p>
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
                Our approach to delivering high-quality online education.
              </p>
            </div>
            <div className="mx-auto grid justify-center gap-4 sm:grid-cols-3 lg:gap-8 mt-12 max-w-6xl">
              <div className="flex flex-col items-center space-y-3 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#fbc710] text-black">
                  <BookOpen className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold">Select a Course</h3>
                <p className="text-muted-foreground">
                  Choose from beginner, intermediate, or expert levels based on your goals.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-3 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#fbc710] text-black">
                  <Clock className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold">Learn at Your Pace</h3>
                <p className="text-muted-foreground">Complete modules flexibly without deadlines.</p>
              </div>
              <div className="flex flex-col items-center space-y-3 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#fbc710] text-black">
                  <Award className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold">Earn Certification</h3>
                <p className="text-muted-foreground">Apply your new skills in real-world scenarios.</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-20 bg-[#fbc710] text-black w-full">
          <div className="max-w-3xl mx-auto text-center space-y-6 px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
              Ready to advance your financial expertise?
            </h2>
            <p className="text-lg text-black/90 max-w-2xl mx-auto">
              Join thousands of professionals who have transformed their careers through our comprehensive online
              courses in tax and accounting.
            </p>
            <Button size="lg" variant="secondary" className="group bg-black text-white hover:bg-black/90">
              Enroll Now
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </section>
      </main>
    </div>
  )
}
