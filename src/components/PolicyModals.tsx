'use client'

import { useState } from 'react'
import Modal from './Modal'
import { 
  ShieldCheckIcon, 
  UserIcon, 
  ClockIcon, 
  CreditCardIcon, 
  BuildingOfficeIcon,
  ScaleIcon,
  DocumentCheckIcon,
  BellAlertIcon
} from '@heroicons/react/24/outline'

interface TawkMessengerProps {
  propertyId: string;
  widgetId: string;
}

declare global {
  interface Window {
    Tawk_API?: {
      onLoad?: () => void;
      minimize?: () => void;
    };
    TawkMessenger?: {
      onLoad?: () => void;
    };
  }
}

interface SectionProps {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  title: string;
  children: React.ReactNode;
}

const Section = ({ icon: Icon, title, children }: SectionProps) => (
  <div className="relative">
    <div className="flex items-start gap-4 group">
      <div className="flex-shrink-0 mt-1">
        <div className="p-2 rounded-xl bg-blue-50 text-blue-600 group-hover:bg-blue-100 group-hover:text-blue-700 transition-colors duration-200">
          <Icon className="w-5 h-5" />
        </div>
      </div>
      <div className="flex-1">
        <h4 className="font-semibold text-lg text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
          {title}
        </h4>
        <div className="mt-2 text-gray-600 space-y-3">
          {children}
        </div>
      </div>
    </div>
  </div>
)

const List = ({ items }: { items: string[] }) => (
  <ul className="list-none pl-0 space-y-2">
    {items.map((item, index) => (
      <li key={index} className="flex items-center gap-2">
        <div className="w-1.5 h-1.5 rounded-full bg-blue-500/40" />
        <span>{item}</span>
      </li>
    ))}
  </ul>
)

export function usePrivacyPolicy() {
  const [isOpen, setIsOpen] = useState(false)
  return {
    openPrivacyPolicy: () => setIsOpen(true),
    PrivacyPolicyModal: () => (
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Privacy Policy"
      >
        <div className="space-y-8">
          <Section icon={UserIcon} title="Information We Collect">
            <p className="text-gray-600">
              We collect information that you provide directly to us, including when you schedule a service, contact us for support, or interact with our website. This may include:
            </p>
            <List items={[
              'Name and contact information',
              'Vehicle information',
              'Service history and preferences',
              'Payment information'
            ]} />
          </Section>

          <Section icon={ShieldCheckIcon} title="How We Use Your Information">
            <p>We use the information we collect to:</p>
            <List items={[
              'Provide and improve our services',
              'Communicate with you about services and appointments',
              'Process your payments',
              'Send you marketing communications (with your consent)',
              'Comply with legal obligations'
            ]} />
          </Section>

          <Section icon={BuildingOfficeIcon} title="Information Sharing">
            <p>
              We do not sell your personal information. We may share your information with:
            </p>
            <List items={[
              'Service providers who assist in our operations',
              'Insurance companies (with your consent)',
              'Law enforcement when required by law'
            ]} />
          </Section>

          <Section icon={DocumentCheckIcon} title="Your Rights">
            <p>You have the right to:</p>
            <List items={[
              'Access your personal information',
              'Correct inaccurate information',
              'Request deletion of your information',
              'Opt-out of marketing communications'
            ]} />
          </Section>

          <Section icon={BellAlertIcon} title="Contact Us">
            <p>
              If you have any questions about this Privacy Policy, please contact us at:
            </p>
            <div className="mt-3 space-y-2">
              <a href="mailto:support@taylorscollision.com" className="flex items-center gap-2 text-blue-600 hover:text-blue-700">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500/40" />
                support@taylorscollision.com
              </a>
              <a href="tel:(770) 495-0050" className="flex items-center gap-2 text-blue-600 hover:text-blue-700">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500/40" />
                (770) 495-0050
              </a>
            </div>
          </Section>
        </div>
      </Modal>
    )
  }
}

export function useTermsOfService() {
  const [isOpen, setIsOpen] = useState(false)
  return {
    openTermsOfService: () => setIsOpen(true),
    TermsOfServiceModal: () => (
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Terms of Service"
      >
        <div className="space-y-8">
          <Section icon={DocumentCheckIcon} title="Acceptance of Terms">
            <p>
              By accessing and using Taylor&apos;s Collision services and website, you agree to be bound by these Terms of Service and all applicable laws and regulations.
            </p>
          </Section>

          <Section icon={BuildingOfficeIcon} title="Service Description">
            <p>
              Taylor&apos;s Collision provides auto body repair services, including but not limited to collision repair, painting, and related automotive services.
            </p>
          </Section>

          <Section icon={ClockIcon} title="Scheduling and Appointments">
            <List items={[
              'Appointments must be scheduled in advance',
              '24-hour notice is required for cancellations',
              'Late arrivals may need to be rescheduled'
            ]} />
          </Section>

          <Section icon={CreditCardIcon} title="Payment Terms">
            <List items={[
              'Payment is required upon completion of service',
              'We accept major credit cards, cash, and approved insurance payments',
              'All prices are subject to change without notice'
            ]} />
          </Section>

          <Section icon={BuildingOfficeIcon} title="Insurance Claims">
            <p>
              We work with most insurance companies but are not responsible for coverage disputes. Customers are responsible for any costs not covered by insurance.
            </p>
          </Section>

          <Section icon={ShieldCheckIcon} title="Warranty">
            <p>
              Our work is backed by a limited warranty. Specific terms and conditions apply. The warranty is non-transferable and valid only for the original repair.
            </p>
          </Section>

          <Section icon={ScaleIcon} title="Limitation of Liability">
            <p>
              Taylor&apos;s Collision is not liable for any indirect, incidental, or consequential damages arising from our services.
            </p>
          </Section>

          <Section icon={DocumentCheckIcon} title="Changes to Terms">
            <p>
              We reserve the right to modify these terms at any time. Continued use of our services constitutes acceptance of any changes.
            </p>
          </Section>
        </div>
      </Modal>
    )
  }
} 