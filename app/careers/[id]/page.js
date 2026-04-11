import { notFound } from 'next/navigation';
import { jobs } from '@/data/jobs';
import { JobDetailPage } from '@/components/pages/careers/JobDetailPage';

export async function generateMetadata({ params }) {
    // Determine the parameters based on actual next 14+ behavior (params might be a promise)
    // Next.js 15+ has asynchronous params. Next.js 13/14 treats it as prop directly but wrapping in await is safe in 15.
    const { id } = await params; 
    const job = jobs.jobs.find((j) => j.id === id);

    if (!job) {
        return {
            title: 'Job Not Found',
        };
    }

    return {
        title: `${job.title} | Careers | Maurya Technologies`,
        description: `Apply for the ${job.title} (${job.type}) role at Maurya Technologies. ${job.description.slice(0, 150)}`,
        alternates: {
            canonical: `/careers/${job.id}`,
        },
        keywords: [job.title, 'Tech Jobs', 'Developer', job.department, 'Maurya Tech Careers'],
        openGraph: {
            title: `${job.title} at Maurya Technologies`,
            description: job.description,
            type: 'website',
            url: `https://mauryatech7.com/careers/${job.id}`,
        }
    };
}

export default async function JobPostPage({ params }) {
    const { id } = await params;
    const job = jobs.jobs.find((j) => j.id === id);

    if (!job || !job.isActive) {
        notFound();
    }

    // JSON-LD structured data for Google Jobs AEO/SEO
    const jsonLd = {
        "@context": "https://schema.org/",
        "@type": "JobPosting",
        "title": job.title,
        "description": job.description,
        "identifier": {
            "@type": "PropertyValue",
            "name": "Maurya Technologies",
            "value": job.id
        },
        "datePosted": new Date().toISOString().split('T')[0],
        "employmentType": job.type === 'Full-time' ? 'FULL_TIME' : 'CONTRACTOR',
        "hiringOrganization": {
            "@type": "Organization",
            "name": "Maurya Technologies",
            "sameAs": "https://mauryatech7.com",
            "logo": "https://mauryatech7.com/logo.png"
        },
        "jobLocationType": job.location.toLowerCase().includes('remote') ? "TELECOMMUTE" : undefined,
        "applicantLocationRequirements": job.location.toLowerCase().includes('india') ? {
            "@type": "Country",
            "name": "India"
        } : undefined,
        "jobLocation": {
            "@type": "Place",
            "address": {
                "@type": "PostalAddress",
                "addressCountry": "IN"
            }
        }
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <JobDetailPage job={job} />
        </>
    );
}
