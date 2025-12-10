import PublicFooter from "@/components/shared/publicFooter";
import PublicNavbar from "@/components/shared/publicNavbar";


const commonLayout = ({children}:{children: React.ReactNode}) => {
    return (
        <div>
            <PublicNavbar/>
            {children}
            <PublicFooter/>
        </div>
    );
};

export default commonLayout;