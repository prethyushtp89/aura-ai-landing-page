import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, email, targetYear, struggle } = body;

        // Tally Form Configuration
        const FORM_ID = 'OD7L1a';

        // Option Mapping for Dropdowns/Multi-choice
        const OPTION_IDS: Record<string, string> = {
            // Target Year
            '2027': '5999e9b8-e1fe-4cb3-859c-6a8e2b11fe53',
            '2028': '7d0412ea-0328-4dfa-b9bf-f1acb520a952',
            '2029': 'd3776c46-30ff-486e-bebd-a7cfda39ccb7',
            // Struggle
            'Concepts': '8521bd69-cb56-420d-9131-1eeead3f107b',
            'Practice': '2bb882c9-ab60-4c53-b422-cfe01e8f727e',
            'Revision': 'ab1ec54a-3bdf-4e6f-891b-31462fd3eb6c',
            'Mocks': '5b687178-6b25-423a-963c-1366af5769cf',
            'Time Mgmt': 'ad0c1fc8-bea8-4430-8db0-dd0bbb74dd1b',
        };

        const payload = {
            sessionUuid: crypto.randomUUID(),
            respondentUuid: crypto.randomUUID(),
            isCompleted: true,
            responses: {
                // Email (Required)
                'b9f32e29-5f5f-4b81-9b62-b1110590cfa5': email,
                // Full Name (Optional)
                'a368051e-2cab-42af-baa9-893aea288798': name || undefined,
                // Target Year (Dropdown -> Array)
                'bbf5637c-9efd-4502-a6b8-a3f609179059': targetYear && OPTION_IDS[targetYear] ? [OPTION_IDS[targetYear]] : undefined,
                // Biggest Struggle (Multi-choice -> Array)
                '5bb62c96-f48e-48d6-abbe-a3de69443ce7': struggle && OPTION_IDS[struggle] ? [OPTION_IDS[struggle]] : undefined,
            },
        };

        // DEBUGGING: Log payload
        console.log("Submitting to Tally:", JSON.stringify(payload, null, 2));

        const response = await fetch(`https://api.tally.so/forms/${FORM_ID}/respond`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // API Key not needed for /respond internal API, but keeping code clean
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            console.error('Tally Submission Error Status:', response.status);
            console.error('Tally Submission Error Text:', await response.text());
            return NextResponse.json({ success: false, error: 'Failed to submit to Tally' }, { status: 500 });
        }

        return NextResponse.json({ success: true });

    } catch (error) {
        console.error('Submission Error:', error);
        return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
    }
}
