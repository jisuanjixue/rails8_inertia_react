
import DefaultLayout from "./DefaultLayout"
import { WobbleCard } from "@/components/ui/wobble-card"
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";

const HomeIndex = () => {
  const words = [
    {
      text: "Build",
    },
    {
      text: "awesome",
    },
    {
      text: "blog",
    },
    {
      text: "with",
    },
    {
      text: "free.",
      className: "text-blue-500 dark:text-blue-500",
    },
  ];
  return (
    <>
      <div className=" flex flex-col items-center justify-center h-[20rem] mt-10">
        <p className="text-xs text-neutral-100 dark:text-neutral-200 sm:text-base ">
          The road to freedom starts from here224
        </p>
        <TypewriterEffectSmooth words={words} />
        <div className="flex flex-col space-x-0 space-y-4 md:flex-row md:space-y-0 md:space-x-4">
          <button className="w-40 h-10 text-sm text-white bg-black border border-transparent rounded-xl dark:border-white">
            Join now
          </button>
          <button className="w-40 h-10 text-sm text-black bg-white border border-black rounded-xl">
            Signup
          </button>
        </div>
      </div>

      <div className="grid w-full grid-cols-1 gap-4 mx-auto mb-10 lg:grid-cols-3 max-w-7xl">
        <WobbleCard
          containerClassName="col-span-1 lg:col-span-2 h-full bg-pink-800 min-h-[500px] lg:min-h-[300px]"
        >
          <div className="max-w-xs">
            <h2 className="text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
              Gippity AI powers the entire universe
            </h2>
            <p className="mt-4 text-left text-base/6 text-neutral-200">
              With over 100,000 mothly active bot users, Gippity AI is the most
              popular AI platform for developers.
            </p>
          </div>
        </WobbleCard>
        <WobbleCard containerClassName="col-span-1 min-h-[300px]">
          <h2 className="max-w-80  text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
            No shirt, no shoes, no weapons.
          </h2>
          <p className="mt-4 max-w-[26rem] text-left  text-base/6 text-neutral-200">
            If someone yells “stop!”, goes limp, or taps out, the fight is over.
          </p>
        </WobbleCard>
        <WobbleCard containerClassName="col-span-1 lg:col-span-3 bg-blue-900 min-h-[500px] lg:min-h-[600px] xl:min-h-[300px]">
          <div className="max-w-sm">
            <h2 className="max-w-sm md:max-w-lg  text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
              Signup for blazing-fast cutting-edge state of the art Gippity AI
              wrapper today!
            </h2>
            <p className="mt-4 max-w-[26rem] text-left  text-base/6 text-neutral-200">
              With over 100,000 mothly active bot users, Gippity AI is the most
              popular AI platform for developers.
            </p>
          </div>
        </WobbleCard>
      </div>
    </>
  )
}
HomeIndex.layout = (page: any) => <DefaultLayout children={page} />
export default HomeIndex

{/* <p style={{ color: 'green' }}>{notice}</p> */ }

{/* <p>Signed as <%= Current.user.email %></p>

<h2>Login and verification</h2>

<div>
  <%= link_to "Change password", edit_password_path %>
</div>

<div>
  <%= link_to "Change email address", edit_identity_email_path %>
</div>

<h2>Access history</h2>

<div>
  <%= link_to "Devices & Sessions", sessions_path %>
</div>

<br>
 <%= link_to "Forgot your password?", new_identity_password_reset_path %>
<%= button_to "Log out", Current.session, method: :delete %></br> */}