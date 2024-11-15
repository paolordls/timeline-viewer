import { fail, redirect, type Actions } from "@sveltejs/kit";

export const actions = {
    default: async ({ request, cookies }) => {
        const formData = await request.formData();
        const email = String(formData.get('email'))
        const password = String(formData.get('password'))

        //TODO: hash the password :/
        if (email === "test@test.com" && password === "test") {
            cookies.set("LoggedIn", "True", { path: "/" })
            redirect(303, "/timeline")
        }
        else
            return fail(400, { error: "Incorrect email or password." })
    }
} satisfies Actions;