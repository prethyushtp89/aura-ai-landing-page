"use server";

export async function submitWaitlist(prevState: any, formData: FormData) {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const targetYear = formData.get("targetYear") as string;
    const struggle = formData.get("struggle") as string;

    // Map Years to Tally IDs
    const YEAR_MAP: Record<string, string> = {
        "2027": "5999e9b8-e1fe-4cb3-859c-6a8e2b11fe53",
        "2028": "7d0412ea-0328-4dfa-b9bf-f1acb520a952",
        "2029": "d3776c46-30ff-486e-bebd-a7cfda39ccb7",
    };

    // Map Struggles to Tally IDs
    const STRUGGLE_MAP: Record<string, string> = {
        "Concepts": "8521bd69-cb56-420d-9131-1eeead3f107b",
        "Practice": "2bb882c9-ab60-4c53-b422-cfe01e8f727e",
        "Revision": "ab1ec54a-3bdf-4e6f-891b-31462fd3eb6c",
        "Mocks": "5b687178-6b25-423a-963c-1366af5769cf",
        "Time Mgmt": "ad0c1fc8-bea8-4430-8db0-dd0bbb74dd1b",
    };

    const payload = {
        responses: {
            "a368051e-2cab-42af-baa9-893aea288798": name || "",
            "b9f32e29-5f5f-4b81-9b62-b1110590cfa5": email,
            "bbf5637c-9efd-4502-a6b8-a3f609179059": YEAR_MAP[targetYear] ? [YEAR_MAP[targetYear]] : [],
            "5bb62c96-f48e-48d6-abbe-a3de69443ce7": STRUGGLE_MAP[struggle] ? [STRUGGLE_MAP[struggle]] : [],
        },
    };

    try {
        const response = await fetch("https://api.tally.so/forms/OD7L1a/respond", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            console.error("Tally Response Status:", response.status);
            const text = await response.text();
            console.error("Tally Response Text:", text);
            console.error("Payload Sent:", JSON.stringify(payload, null, 2));
            throw new Error(`Tally submission failed: ${response.status}`);
        }

        return { success: true };
    } catch (error) {
        console.error("Submission Error:", error);
        return { success: false, error: "Failed to submit form." };
    }
}
