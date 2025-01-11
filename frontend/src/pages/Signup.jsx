import { Auth } from "../components/Auth"
import { Quote } from "../components/Quote"

export const Signup = () => {
    return <div>
        <div className="grid lg:grid-cols-2">
            <div>
                <Auth type="signup" />
            </div>
            {/* <div className="hidden lg:block">
                <Quote></Quote>
            </div> */}
        </div>
    </div>
}