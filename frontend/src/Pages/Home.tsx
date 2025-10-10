import CreateRoom from "../Components/CreateRoom"
import {ChevronRight} from 'lucide-react'

const Home: React.FC = () => {
    return (
        <>
        <div className="h-[100vh] flex items-center justify-center">
             <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
              Video Meetings
              <span className="block bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Made Simple
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Connect with anyone, anywhere. High-quality video calls with just one click. No downloads, no hassle.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg text-lg font-semibold hover:shadow-2xl transition transform hover:scale-105 flex items-center gap-2">
                 <CreateRoom />
                <ChevronRight className="w-5 h-5" />
              </button> 
            </div>
          </div>
           
            </div>
         </div>
         </div>
        </>
    )
}

export default Home;