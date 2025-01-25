import { Auth } from "../components/Auth"
import { Quote } from "../components/Quote"

export const Signup = () => {
    return <div>
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 lg:px-8">
            <div>
                <Auth type="signup" />
            </div>
          
        </div>
    </div>
}